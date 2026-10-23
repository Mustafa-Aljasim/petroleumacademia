'use strict';
((scope) => {
  const text = value => typeof value === 'string' ? value.trim() : '';
  const permalink = value => {
    const raw = text(value);
    if (!raw || /[\\\u0000-\u0020\u007f]/.test(raw) || /\/\.{1,2}(?:\/|$)/.test(raw.split(/[?#]/)[0])) return null;
    try {
      const url = new URL(raw);
      if (url.protocol !== 'https:' || !['instagram.com','www.instagram.com'].includes(url.hostname) || url.port || url.username || url.password) return null;
      const match = /^\/(p|reel)\/([A-Za-z0-9_-]{1,100})\/?$/.exec(url.pathname);
      return match ? `https://www.instagram.com/${match[1]}/${match[2]}/` : null;
    } catch { return null; }
  };
  const validDate = value => {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const date = new Date(`${value}T12:00:00Z`);
    return Number.isFinite(date.getTime()) && date.toISOString().slice(0,10) === value;
  };
  const normalize = rows => {
    const ids = new Set(), urls = new Set(), posts = []; let invalid = 0;
    rows.forEach(item => {
      if (!item || item.published !== true) return;
      const url = permalink(item.instagramUrl);
      if (!text(item.id) || !text(item.title) || !validDate(item.date) || !url || ids.has(item.id) || urls.has(url)) { invalid++; return; }
      ids.add(item.id); urls.add(url); posts.push({...item, url});
    });
    posts.sort((a,b)=>b.date.localeCompare(a.date));
    return {posts, invalid};
  };
  const paginate = (posts, requested = 1) => {
    const pages = Math.max(1, Math.ceil(posts.length / 6));
    const page = Math.min(pages, Math.max(1, Number.isSafeInteger(requested) ? requested : 1));
    return {page, pages, posts:posts.slice((page-1)*6, page*6)};
  };
  const model = {text, permalink, validDate, normalize, paginate};
  if (typeof module !== 'undefined' && module.exports) module.exports = model;
  else scope.PA_INSTAGRAM = model;
})(globalThis);
