'use strict';
(() => {
  const root=document.getElementById('free-resources');if(!root)return;
  const text=value=>typeof value==='string'?value.trim():'';
  const destination=value=>{
    const raw=text(value);
    if(!raw||/[\\\u0000-\u001f\u007f]/.test(raw))return null;
    if(raw.startsWith('/downloads/')){
      if(/[?#]/.test(raw))return null;
      try{
        const parts=raw.slice('/downloads/'.length).split('/');
        if(parts.some(part=>{const decoded=decodeURIComponent(part);return !decoded||['.','..'].includes(decoded)||/[\/\\%?#\u0000-\u001f\u007f]/.test(decoded);}))return null;
        const parsed=new URL(raw,location.origin);
        return parsed.origin===location.origin&&parsed.pathname.startsWith('/downloads/')?{href:parsed.href,local:true,direct:true}:null;
      }catch{return null;}
    }
    try{
      if(!/^https?:\/\//i.test(raw))return null;
      const parsed=new URL(raw);
      if(!['http:','https:'].includes(parsed.protocol)||parsed.username||parsed.password)return null;
      return {href:parsed.href,local:false,direct:/\.(?:xlsx?|csv|pdf|zip|txt|json|docx?|pptx?|tsv|gz|7z)$/i.test(parsed.pathname)};
    }catch{return null;}
  };
  let entries=[],state='loading';
  const render=()=>{
    const ar=window.PA_LANGUAGE==='ar';
    const labels=ar?{loading:'جارٍ تحميل المصادر…',error:'تعذّر تحميل المصادر. يرجى تحديث الصفحة أو المحاولة لاحقًا.',empty:'لا توجد مصادر مجانية منشورة حاليًا.',detail:'عد لاحقًا للاطلاع على مجموعات البيانات والقوالب والمواد التعليمية.',open:'افتح المصدر',tab:'يفتح في علامة تبويب جديدة'}:{loading:'Loading resources…',error:'We couldn’t load the resources. Please refresh or try again later.',empty:'No free resources are published yet.',detail:'Check back for datasets, templates, and learning materials.',open:'Open Resource',tab:'opens in a new tab'};
    const el=(tag,content,cls)=>{const node=document.createElement(tag);node.textContent=content;if(cls)node.className=cls;return node;};
    root.replaceChildren();root.setAttribute('aria-busy',String(state==='loading'));
    if(state!=='ready'||!entries.length){const box=el('div','','catalog-state');box.append(el('h2',state==='loading'?labels.loading:state==='error'?labels.error:labels.empty));if(state==='ready')box.append(el('p',labels.detail));root.append(box);return;}
    const grid=el('div','','catalog-grid');
    entries.forEach(({item,link})=>{
      const value=key=>text(ar&&item[`${key}_ar`])||text(item[key]);
      const card=el('article','','catalog-card resource-card');card.append(el('h2',value('title')));
      if(value('category'))card.append(el('p',value('category'),'resource-category'));
      if(value('description'))card.append(el('p',value('description')));
      if(value('format'))card.append(el('span',value('format'),'resource-format'));
      let button=value('buttonLabel')||labels.open;
      if(!link.direct&&/\bdownload\b|تحميل|تنزيل/i.test(button))button=labels.open;
      const action=el('a',`${button} ${link.local?'↓':'↗'}`,'button primary');action.href=link.href;
      if(link.local)action.download='';
      else{action.target='_blank';action.rel='noopener noreferrer';}
      action.setAttribute('aria-label',`${button}: ${value('title')}${link.local?'':` (${labels.tab})`}`);card.append(action);grid.append(card);
    });root.append(grid);
  };
  document.addEventListener('pa-language-change',render);render();
  fetch('/data/resources.json',{cache:'no-cache'}).then(response=>{if(!response.ok)throw Error();return response.json();}).then(data=>{
    if(!Array.isArray(data))throw Error();const ids=new Set();
    entries=data.flatMap(item=>{if(!item||item.published!==true||!text(item.id)||ids.has(item.id)||!text(item.title))return[];const link=destination(item.url);if(!link)return[];ids.add(item.id);return[{item,link}];});state='ready';render();
  }).catch(()=>{state='error';render();});
})();
