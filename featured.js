'use strict';
(() => {
  const section = document.getElementById('featured-resource');
  if (!section) return;
  const types = ['Tool', 'Course', 'Lecture', 'Resource'];
  const text = value => typeof value === 'string' ? value.trim() : '';
  const destination = value => {
    const raw = text(value);
    // Root-relative paths only: reject protocol-relative URLs, backslashes,
    // and control characters before URL parsing can normalize them.
    if (!raw || /[\\\u0000-\u001f\u007f]/.test(raw)) return null;
    try {
      const parsed = new URL(raw, location.origin);
      const internal = raw.startsWith('/') && !raw.startsWith('//') && parsed.origin === location.origin;
      const absolute = /^https?:\/\//i.test(raw) && ['http:', 'https:'].includes(parsed.protocol);
      return (internal || absolute) && !parsed.username && !parsed.password ? {href:parsed.href, external:parsed.origin !== location.origin} : null;
    } catch { return null; }
  };
  let item, link;
  const render = () => {
    if (!item) return;
    const ar = window.PA_LANGUAGE === 'ar';
    const localized = key => text(ar && item[`${key}_ar`]) || text(item[key]);
    const create = (tag, content, cls) => { const el=document.createElement(tag); el.textContent=content; if(cls)el.className=cls; return el; };
    section.replaceChildren();
    const card=create('article','','featured-card');
    const copy=create('div','','featured-copy');
    const label=create('p',`${ar?'مصدر مميز':'FEATURED RESOURCE'} / ${ar?({Tool:'أداة',Course:'دورة',Lecture:'محاضرة',Resource:'مصدر'})[item.type]:item.type}`,'eyebrow');
    const title=create('h2',localized('title')); title.id='featured-title';
    copy.append(label,title,create('p',localized('description'),'featured-description'));
    const action=create('a',`${localized('buttonLabel')} ${link.external?'↗':'→'}`,'button primary');
    action.href=link.href;
    if(link.external){action.target='_blank';action.rel='noopener noreferrer';action.setAttribute('aria-label',`${localized('buttonLabel')}: ${localized('title')} (${ar?'يفتح في علامة تبويب جديدة':'opens in a new tab'})`);}
    card.append(copy,action);section.append(card);section.hidden=false;
  };
  document.addEventListener('pa-language-change',render);
  fetch('/data/featured.json',{cache:'no-cache'})
    .then(response=>{if(!response.ok)throw Error('Unavailable');return response.json();})
    .then(data=>{
      if(!data || data.published!==true || !types.includes(data.type) || !['title','description','buttonLabel'].every(key=>text(data[key])))return;
      link=destination(data.url);if(!link)return;
      item=data;render();
    }).catch(()=>{section.hidden=true;});
})();
