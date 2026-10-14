'use strict';
(() => {
  const section = document.getElementById('founder-profile');
  if (!section) return;
  const text = value => typeof value === 'string' ? value.trim() : '';
  const localPhoto = value => {
    const path = text(value);
    if (!path || /[\\\u0000-\u001f\u007f]/.test(path) || path.startsWith('//') || /^[a-z][a-z\d+.-]*:/i.test(path)) return null;
    try {
      const url = new URL(path, `${location.origin}/`);
      return url.origin === location.origin && /\.(?:png|jpe?g|webp|avif|gif)$/i.test(url.pathname) && !url.search && !url.hash ? url.href : null;
    } catch { return null; }
  };
  const linkedIn = value => {
    try {
      const url = new URL(text(value));
      return ['http:', 'https:'].includes(url.protocol) && ['linkedin.com','www.linkedin.com'].includes(url.hostname) && !url.username && !url.password && /^\/in\/[^/]+\/?$/.test(url.pathname) ? url.href : null;
    } catch { return null; }
  };
  let profile, photo;
  const create = (tag, content, cls) => { const el = document.createElement(tag); el.textContent = content; if (cls) el.className = cls; return el; };
  const render = () => {
    if (!profile) return;
    const ar = window.PA_LANGUAGE === 'ar';
    const value = key => text(ar && profile[`${key}_ar`]) || text(profile[key]);
    section.replaceChildren();
    const card = create('article', '', 'founder-card');
    const copy = create('div', '', 'founder-copy');
    copy.append(create('p', ar ? 'مؤسس بتروليوم أكاديميا' : 'MEET THE FOUNDER', 'eyebrow'));
    const name = create('h2', value('name')); name.id = 'founder-name';
    copy.append(name, create('p', value('role'), 'founder-role'), create('p', value('bio'), 'founder-bio'));
    const href = linkedIn(profile.linkedinUrl);
    if (href) {
      const link = create('a', ar ? 'تواصل عبر لينكدإن ↗' : 'Connect on LinkedIn ↗', 'button secondary');
      link.href = href; link.target = '_blank'; link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', ar ? 'تواصل عبر لينكدإن (يفتح في علامة تبويب جديدة)' : 'Connect on LinkedIn (opens in a new tab)'); copy.append(link);
    }
    card.append(copy); section.append(card); section.hidden = false;
    // Preload outside the visible DOM: failed images never leave a broken icon.
    if (photo) {
      const image = new Image(); image.alt = ar ? `صورة ${value('name')}` : `Portrait of ${value('name')}`;
      image.width = 200; image.height = 240; image.className = 'founder-photo';
      image.onload = () => { if (image.naturalWidth > 0 && card.isConnected) { card.prepend(image); card.classList.add('has-portrait'); } };
      image.onerror = () => { image.remove(); card.classList.remove('has-portrait'); };
      image.src = photo;
    }
  };
  document.addEventListener('pa-language-change', render);
  fetch('/data/founder.json', {cache:'no-cache'})
    .then(response => { if (!response.ok) throw Error(); return response.json(); })
    .then(data => { if (!data || data.published !== true || !['name','role','bio'].every(key => text(data[key]))) return; profile = data; photo = localPhoto(data.photoPath); render(); })
    .catch(() => { section.hidden = true; });
})();
