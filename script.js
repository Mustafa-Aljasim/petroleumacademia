'use strict';
(() => {
  const config = window.PA_CONFIG || {};
  const safeUrl = value => {
    try { const url = new URL(value); return url.protocol === 'https:' ? url.href : null; }
    catch { return null; }
  };
  const contacts = document.getElementById('contact-links');
  if (!contacts) return;
  const addContact = (label, detail, href, external = false) => {
    const link = document.createElement('a');
    link.href = href;
    if (external) { link.target = '_blank'; link.rel = 'noopener noreferrer'; link.setAttribute('aria-label', `${label} (opens in a new tab)`); }
    const text = document.createElement('span');
    const name = document.createElement('strong'); name.textContent = label;
    const sub = document.createElement('small'); sub.textContent = detail;
    const arrow = document.createElement('span'); arrow.textContent = '↗'; arrow.setAttribute('aria-hidden', 'true');
    text.append(name, sub); link.append(text, arrow); contacts.append(link);
  };
  const labels = { linkedin: ['LinkedIn', 'Ideas, insights & professional connections'], instagram: ['Instagram', 'Learning content & updates'], facebook: ['Facebook', 'Connect with our community'], telegram: ['Telegram', 'Follow our updates'] };
  Object.entries(labels).forEach(([key, [label, detail]]) => {
    const href = safeUrl(config.social?.[key]); if (href) addContact(label, detail, href, true);
  });
  if (typeof config.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email)) addContact('Email', config.email, `mailto:${config.email}`);
  if (config.phone?.label && /^tel:\+?[\d ()-]+$/.test(config.phone.href)) addContact('Phone', config.phone.label, config.phone.href);
  document.getElementById('year').textContent = new Date().getFullYear();
})();
