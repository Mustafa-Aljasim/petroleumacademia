'use strict';
// Pure time/link logic, shared by the browser and dependency-free tests.
((scope) => {
  const httpUrl = value => {
    try { const url = new URL(value); return ['http:', 'https:'].includes(url.protocol) && !url.username && !url.password ? url.href : null; } catch { return null; }
  };
  const timestamp = value => {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?[+-]\d{2}:\d{2}$/.test(value)) return NaN;
    const time = Date.parse(value);
    const day = Number(value.slice(8,10)), month = Number(value.slice(5,7)), year = Number(value.slice(0,4));
    if (month < 1 || month > 12 || day < 1 || day > new Date(Date.UTC(year,month,0)).getUTCDate()) return NaN;
    return time;
  };
  const normalize = rows => {
    const ids = new Set(); let invalid = 0;
    const events = [];
    rows.forEach(item => {
      if (!item || item.published !== true) return;
      const start = timestamp(item.startAt), end = item.endAt ? timestamp(item.endAt) : null;
      if (typeof item.id !== 'string' || !item.id.trim() || ids.has(item.id) || typeof item.topic !== 'string' || !item.topic.trim() || typeof item.instructor !== 'string' || !item.instructor.trim() || !Number.isFinite(start) || end !== null && (!Number.isFinite(end) || end <= start)) { invalid++; return; }
      ids.add(item.id); events.push({...item,start,end,url:httpUrl(item.destinationUrl)});
    });
    return {events:events.sort((a,b)=>a.start-b.start),invalid};
  };
  const stateAt = (event, now) => event.end !== null && now >= event.end ? 'ended' : now >= event.start ? 'available' : 'upcoming';
  const countdown = (start, now) => {
    const seconds = Math.max(0,Math.ceil((start-now)/1000));
    return [Math.floor(seconds/86400),Math.floor(seconds/3600)%24,Math.floor(seconds/60)%60,seconds%60];
  };
  const model = {httpUrl,timestamp,normalize,stateAt,countdown};
  if (typeof module !== 'undefined' && module.exports) module.exports = model;
  else scope.PA_EVENTS = model;
})(globalThis);
