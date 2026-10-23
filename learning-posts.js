'use strict';
(() => {
  const root = document.getElementById('learning-posts'); if (!root) return;
  const model = window.PA_INSTAGRAM;
  let posts = [], invalid = 0, state = 'loading', observer, scriptPromise, scriptFailed = false;
  const readPage = () => Number(new URL(location.href).searchParams.get('page') || 1);
  let requested = readPage();
  const words = {
    en:{loading:'Loading learning posts…',empty:'No learning posts are published yet.',emptyDetail:'Check back for selected educational posts from Petroleum Academia.',error:'We couldn’t load the posts. Please refresh or try again later.',open:'Open on Instagram',view:'View this post on Instagram',pending:'Instagram content loads as you scroll closer. If it does not appear, use the link below.',blocked:'Instagram embeds may be blocked or unavailable. Titles and Open on Instagram links remain available.',invalid:'Some entries could not be displayed because their details or URLs are invalid.',previous:'Previous page',next:'Next page',pagination:'Learning Posts pages',page:(p,n)=>`Page ${p} of ${n}`,range:(start,end,total)=>`Posts ${start}–${end} of ${total}`,tab:'opens in a new tab'},
    ar:{loading:'جارٍ تحميل المنشورات التعليمية…',empty:'لا توجد منشورات تعليمية منشورة حاليًا.',emptyDetail:'عد لاحقًا للاطلاع على منشورات تعليمية مختارة من بتروليوم أكاديميا.',error:'تعذّر تحميل المنشورات. يرجى التحديث أو المحاولة لاحقًا.',open:'افتح على إنستغرام',view:'شاهد هذا المنشور على إنستغرام',pending:'يُحمّل محتوى إنستغرام عند الاقتراب منه. إذا لم يظهر، استخدم الرابط أدناه.',blocked:'قد تكون تضمينات إنستغرام محظورة أو غير متاحة. تظل العناوين وروابط إنستغرام متاحة.',invalid:'تعذّر عرض بعض المنشورات بسبب بيانات أو روابط غير صالحة.',previous:'الصفحة السابقة',next:'الصفحة التالية',pagination:'صفحات المنشورات التعليمية',page:(p,n)=>`الصفحة ${p} من ${n}`,range:(start,end,total)=>`المنشورات ${start}–${end} من ${total}`,tab:'يفتح في علامة تبويب جديدة'}
  };
  const locale = () => window.PA_LANGUAGE === 'ar' ? 'ar' : 'en';
  const node = (tag, content, cls) => { const el = document.createElement(tag); el.textContent = content; if (cls) el.className = cls; return el; };
  const externalLink = (label, href) => { const a = node('a',label);a.href=href;a.target='_blank';a.rel='noopener noreferrer';return a; };
  const showEmbedFailure = () => {
    scriptFailed = true;
    const message = root.querySelector('.embed-service-note');
    if (message) message.textContent = words[locale()].blocked;
  };
  const processEmbeds = () => {
    try {
      if (typeof window.instgrm?.Embeds?.process !== 'function') throw Error();
      window.instgrm.Embeds.process();
      // Processing is not proof of a successful post render; never claim it is.
    } catch { showEmbedFailure(); }
  };
  const loadInstagram = () => {
    if (scriptPromise) return scriptPromise;
    scriptPromise = new Promise((resolve,reject) => {
      const script = document.createElement('script');
      script.id = 'instagram-embed-script';script.src='https://www.instagram.com/embed.js';script.async=true;
      const timeout = setTimeout(()=>reject(Error('Instagram did not respond')),15000);
      script.onload=()=>{clearTimeout(timeout);resolve();};
      script.onerror=()=>{clearTimeout(timeout);reject(Error('Instagram blocked'));};
      document.head.append(script);
    });
    return scriptPromise;
  };
  const mount = slot => {
    if (!slot.isConnected || slot.dataset.mounted === 'true') return;
    slot.dataset.mounted='true';slot.replaceChildren();
    const quote=node('blockquote','','instagram-media');
    quote.setAttribute('data-instgrm-permalink',slot.dataset.permalink);
    quote.setAttribute('data-instgrm-version','14');
    quote.setAttribute('data-instgrm-captioned','');
    quote.append(externalLink(words[locale()].view,slot.dataset.permalink));
    slot.append(quote);
    loadInstagram().then(()=>{if(slot.isConnected)processEmbeds();}).catch(showEmbedFailure);
  };
  const render = (focus = false) => {
    observer?.disconnect();root.replaceChildren();
    const lang=locale(), t=words[lang];root.setAttribute('aria-busy',String(state==='loading'));
    if(state!=='ready'||!posts.length){const box=node('div','','catalog-state');box.append(node('h2',state==='loading'?t.loading:state==='error'?t.error:t.empty));if(state==='ready')box.append(node('p',t.emptyDetail));root.append(box);return;}
    const current=model.paginate(posts,requested);requested=current.page;
    const heading=node('h2',t.range((current.page-1)*6+1,Math.min(current.page*6,posts.length),posts.length),'posts-page-heading');heading.tabIndex=-1;root.append(heading);
    if(invalid)root.append(node('p',t.invalid,'posts-note'));
    root.append(node('p',scriptFailed?t.blocked:t.pending,'embed-service-note posts-note'));
    const grid=node('div','','learning-posts-grid');grid.id='posts-grid';root.append(grid);
    const slots=[];
    current.posts.forEach(post=>{
      const localized=key=>model.text(lang==='ar'&&post[`${key}_ar`])||model.text(post[key]);
      const card=node('article','','learning-post-card');
      card.append(node('h3',localized('title')));
      const meta=node('div','','post-meta');
      const date=node('time',new Intl.DateTimeFormat(lang==='ar'?'ar-IQ':'en-GB',{dateStyle:'long',timeZone:'UTC'}).format(new Date(`${post.date}T12:00:00Z`)));date.dateTime=post.date;meta.append(date);
      if(localized('category'))meta.append(node('span',localized('category'),'post-category'));
      card.append(meta);
      const slot=node('div',t.pending,'instagram-slot');slot.dataset.permalink=post.url;card.append(slot);slots.push(slot);
      const fallback=externalLink(`${t.open} ↗`,post.url);fallback.className='text-link post-fallback';fallback.setAttribute('aria-label',`${t.open}: ${localized('title')} (${t.tab})`);card.append(fallback);grid.append(card);
    });
    if(current.pages>1){
      const nav=node('nav','','posts-pagination');nav.setAttribute('aria-label',t.pagination);
      const previous=node('button',t.previous,'button secondary');previous.type='button';previous.disabled=current.page===1;previous.setAttribute('aria-controls','posts-grid');previous.addEventListener('click',()=>changePage(current.page-1));
      const status=node('span',t.page(current.page,current.pages));status.setAttribute('role','status');
      const next=node('button',t.next,'button secondary');next.type='button';next.disabled=current.page===current.pages;next.setAttribute('aria-controls','posts-grid');next.addEventListener('click',()=>changePage(current.page+1));
      nav.append(previous,status,next);root.append(nav);
    }
    if(focus)heading.focus();
    if(typeof IntersectionObserver==='function'){
      observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){observer.unobserve(entry.target);mount(entry.target);}}),{rootMargin:'200px 0px'});
      slots.forEach(slot=>observer.observe(slot));
    }else slots.forEach(mount);
    if(scriptPromise)scriptPromise.then(processEmbeds).catch(showEmbedFailure);
  };
  const changePage = page => {
    requested=model.paginate(posts,page).page;
    const url=new URL(location.href);url.searchParams.set('page',String(requested));history.pushState({},'',url);render(true);
  };
  window.addEventListener('popstate',()=>{requested=readPage();render(true);});
  window.addEventListener('pagehide',()=>observer?.disconnect());
  window.addEventListener('pageshow',event=>{if(event.persisted)render();});
  document.addEventListener('pa-language-change',()=>render());
  render();
  fetch('/data/instagram-posts.json',{cache:'no-cache'}).then(response=>{if(!response.ok)throw Error();return response.json();}).then(data=>{
    if(!Array.isArray(data))throw Error();({posts,invalid}=model.normalize(data));state='ready';render();
  }).catch(()=>{state='error';render();});
})();
