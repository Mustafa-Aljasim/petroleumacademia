'use strict';
(() => {
  const root = document.getElementById('catalog');
  if (!root) return;
  const kind = root.dataset.kind;
  let items = [], state = 'loading';
  const copy = {
    en: { loading:'Loading listings…', error:'We couldn’t load this list. Please refresh the page or try again later.', toolsEmpty:'No tools are published yet.', coursesEmpty:'No courses or lectures are published yet.', emptyDetail:'Please check back, or connect with us for updates.', open:'Open Tool', details:'View Details', instructor:'Instructor', format:'Format', date:'Date', price:'Price', Available:'Available', Upcoming:'Upcoming', 'Registration Closed':'Registration Closed', tab:'opens in a new tab' },
    ar: { loading:'جارٍ تحميل القائمة…', error:'تعذّر تحميل القائمة. يرجى تحديث الصفحة أو المحاولة لاحقًا.', toolsEmpty:'لا توجد أدوات منشورة حاليًا.', coursesEmpty:'لا توجد دورات أو محاضرات منشورة حاليًا.', emptyDetail:'عد لاحقًا أو تواصل معنا للاطلاع على المستجدات.', open:'افتح الأداة', details:'عرض التفاصيل', instructor:'المحاضر', format:'نوع التقديم', date:'التاريخ', price:'السعر', Available:'متاح', Upcoming:'قريبًا', 'Registration Closed':'التسجيل مغلق', tab:'يفتح في علامة تبويب جديدة' }
  };
  const text = value => typeof value === 'string' ? value.trim() : '';
  const url = value => {
    try { const parsed = new URL(text(value)); return ['http:', 'https:'].includes(parsed.protocol) && !parsed.username && !parsed.password ? parsed.href : null; } catch { return null; }
  };
  const element = (tag, content, className) => {
    const node = document.createElement(tag); node.textContent = content;
    if (className) node.className = className; return node;
  };
  const render = () => {
    const language = window.PA_LANGUAGE === 'ar' ? 'ar' : 'en', t = copy[language];
    const localized = (item, key) => text(language === 'ar' && item[`${key}_ar`] || item[key]);
    root.replaceChildren(); root.setAttribute('aria-busy', String(state === 'loading'));
    if (state !== 'ready' || !items.length) {
      const box = element('div', '', 'catalog-state');
      box.append(element('h2', state === 'loading' ? t.loading : state === 'error' ? t.error : t[`${kind}Empty`]));
      if (state === 'ready') {
        box.append(element('p', t.emptyDetail));
        const link = element('a', language === 'ar' ? 'تواصل معنا ←' : 'Connect with us →', 'text-link'); link.href = '/#contact'; box.append(link);
      }
      root.append(box); return;
    }
    const grid = element('div', '', 'catalog-grid');
    items.forEach(item => {
      const card = element('article', '', 'catalog-card');
      if (kind === 'courses' && text(item.status)) card.append(element('span', t[text(item.status)] || localized(item, 'status'), 'course-status'));
      card.append(element('h2', localized(item, 'title')));
      if (localized(item, 'description')) card.append(element('p', localized(item, 'description')));
      if (kind === 'courses') {
        const fields = element('dl', '', 'course-fields');
        ['instructor','format','date','price'].forEach(key => {
          const value = localized(item, key);
          if (value) { const row = element('div', ''); row.append(element('dt', t[key]), element('dd', value)); fields.append(row); }
        });
        if (fields.childElementCount) card.append(fields);
      }
      const href = url(item.url);
      if (href) {
        const label = kind === 'tools' ? t.open : localized(item,'buttonLabel') || t.details;
        const link = element('a', `${label} ↗`, 'button primary'); link.href = href; link.target = '_blank'; link.rel = 'noopener noreferrer';
        link.setAttribute('aria-label', `${label}: ${localized(item,'title')} (${t.tab})`); card.append(link);
      }
      grid.append(card);
    });
    root.append(grid);
  };
  document.addEventListener('pa-language-change', render);
  render();
  fetch(`/data/${kind}.json`, {cache:'no-cache'})
    .then(response => { if (!response.ok) throw new Error('HTTP failure'); return response.json(); })
    .then(data => {
      if (!Array.isArray(data)) throw new Error('Expected an array');
      if (data.some(item => !item || typeof item !== 'object' || typeof item.published !== 'boolean' || item.published && !text(item.title))) throw new Error('Invalid listing');
      items = data.filter(item => item.published === true && (kind !== 'tools' || url(item.url)));
      state = 'ready'; render();
    }).catch(() => { state = 'error'; render(); });
})();
