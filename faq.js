'use strict';
(() => {
  const section = document.getElementById('faq-section');
  if (!section) return;
  const text = value => typeof value === 'string' ? value.trim() : '';
  let entries = [];
  const render = () => {
    const expanded = new Set(Array.from(section.querySelectorAll('details[open]'), item => item.dataset.faqId));
    section.replaceChildren();
    section.hidden = !entries.length;
    if (!entries.length) return;
    const ar = window.PA_LANGUAGE === 'ar';
    const heading = document.createElement('h2'); heading.id = 'faq-title';
    heading.textContent = ar ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'; section.append(heading);
    const list = document.createElement('div'); list.className = 'faq-list';
    entries.forEach(item => {
      const details = document.createElement('details'); details.dataset.faqId = item.id;
      details.open = expanded.has(item.id);
      const summary = document.createElement('summary');
      summary.textContent = text(ar && item.question_ar) || text(item.question);
      const answer = document.createElement('p');
      answer.textContent = text(ar && item.answer_ar) || text(item.answer);
      details.append(summary, answer); list.append(details);
    });
    section.append(list);
  };
  document.addEventListener('pa-language-change', render);
  fetch('/data/faq.json', {cache:'no-cache'})
    .then(response => { if (!response.ok) throw Error(); return response.json(); })
    .then(data => {
      if (!Array.isArray(data)) throw Error();
      const ids = new Set();
      entries = data.filter(item => {
        if (!item || item.published !== true || !text(item.id) || ids.has(item.id) || !text(item.question) || !text(item.answer)) return false;
        ids.add(item.id); return true;
      });
      render();
    }).catch(() => { section.hidden = true; });
})();
