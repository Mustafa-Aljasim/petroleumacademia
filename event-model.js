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
  const escapeCalendarText = value => String(value ?? '').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g,'').replace(/\\/g,'\\\\').replace(/\r\n|\r|\n/g,'\\n').replace(/;/g,'\\;').replace(/,/g,'\\,');
  const foldCalendarLine = value => {
    const encoder = new TextEncoder(); let line='', bytes=0, result='';
    for (const char of value) {
      const length=encoder.encode(char).length;
      if (bytes+length>75) { result+=line+'\r\n';line=' ';bytes=1; }
      line+=char;bytes+=length;
    }
    return result+line;
  };
  const calendarFile = (event, now = Date.now()) => {
    const utc = value => new Date(value).toISOString().replace(/[-:]/g,'').replace(/\.\d{3}Z$/,'Z');
    let duration=typeof event.durationMinutes==='number' && Number.isFinite(event.durationMinutes) && event.durationMinutes>0 ? event.durationMinutes : 60;
    if (!Number.isFinite(new Date(event.start+duration*60000).getTime())) duration=60;
    const end=event.end ?? event.start+duration*60000;
    const page='https://petroleumacademia.com/upcoming/';
    const notes=[`Instructor: ${event.instructor}`,typeof event.description==='string'?event.description:'',`Event page (return here for the joining link): ${page}`].filter(Boolean).join('\n\n');
    const uid=Array.from(new TextEncoder().encode(event.id),byte=>byte.toString(16).padStart(2,'0')).join('')+'@petroleumacademia.com';
    const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Petroleum Academia//Upcoming Events//EN','CALSCALE:GREGORIAN','BEGIN:VEVENT',`UID:${uid}`,`DTSTAMP:${utc(now)}`,`DTSTART:${utc(event.start)}`,`DTEND:${utc(end)}`,`SUMMARY:${escapeCalendarText(event.topic)}`,`DESCRIPTION:${escapeCalendarText(notes)}`,`URL:${page}`];
    if(typeof event.location==='string' && event.location.trim())lines.push(`LOCATION:${escapeCalendarText(event.location.trim())}`);
    // Always use the public page, never the release-controlled destination URL.
    lines.push('END:VEVENT','END:VCALENDAR');
    return lines.map(foldCalendarLine).join('\r\n')+'\r\n';
  };
  const model = {httpUrl,timestamp,normalize,stateAt,countdown,calendarFile};
  if (typeof module !== 'undefined' && module.exports) module.exports = model;
  else scope.PA_EVENTS = model;
})(globalThis);
