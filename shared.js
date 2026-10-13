'use strict';
(() => {
  // One shared navigation and footer for all three static pages.
  const routes = [['/', 'Home'], ['/tools/', 'Tools'], ['/courses/', 'Courses & Lectures'], ['/#contact', 'Let’s connect']];
  const nav = document.querySelector('nav');
  const toggle = document.getElementById('language-toggle');
  nav.replaceChildren();
  routes.forEach(([href, title]) => {
    const link = document.createElement('a'); link.href = href; link.textContent = title;
    if (href === location.pathname) link.setAttribute('aria-current', 'page');
    if (href.includes('#')) link.className = 'nav-contact';
    nav.append(link);
  });
  nav.append(toggle);
  const footer = document.querySelector('footer');
  const links = document.createElement('div'); links.className = 'footer-links';
  routes.slice(0,3).forEach(([href, title]) => { const link = document.createElement('a'); link.href = href; link.textContent = title; links.append(link); });
  footer.querySelector('p')?.replaceWith(links);
  footer.querySelector('.footer-brand').href = '/';
  document.querySelector('.brand').href = '/';
  document.querySelector('.back-top').href = '#top';
  document.body.id = 'top';
  document.getElementById('year').textContent = new Date().getFullYear();
})();
