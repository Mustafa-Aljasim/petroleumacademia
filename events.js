'use strict';
(() => {
  const root = document.getElementById('events'); if (!root) return;
  const model = window.PA_EVENTS;
  let entries = [], invalid = 0, loadState = 'loading', signature = '', counters = [];
  const words = {
    en:{loading:'Loading events…',empty:'No events are published yet.',detail:'Check back for lecture and course announcements.',error:'We couldn’t load the events. Please refresh or try again later.',invalid:'Some events are unavailable because their details are incomplete.',ended:'Event ended',available:'Available now',endedHeading:'Past events',join:'Join event',unavailable:'The destination link is unavailable.',time:'Baghdad time (UTC+03:00)',instructor:'Instructor',units:['Days','Hours','Minutes','Seconds'],tab:'opens in a new tab'},
    ar:{loading:'جارٍ تحميل الفعاليات…',empty:'لا توجد فعاليات منشورة حاليًا.',detail:'عد لاحقًا للاطلاع على إعلانات المحاضرات والدورات.',error:'تعذّر تحميل الفعاليات. يرجى التحديث أو المحاولة لاحقًا.',invalid:'بعض الفعاليات غير متاحة بسبب نقص بياناتها.',ended:'انتهت الفعالية',available:'متاح الآن',endedHeading:'الفعاليات السابقة',join:'انضم إلى الفعالية',unavailable:'رابط الفعالية غير متاح.',time:'توقيت بغداد (UTC+03:00)',instructor:'المحاضر',units:['أيام','ساعات','دقائق','ثوانٍ'],tab:'يفتح في علامة تبويب جديدة'}
  };
  const node = (tag,text,cls) => { const el = document.createElement(tag); el.textContent = text; if(cls)el.className=cls; return el; };
  const tick = () => {
    const now = Date.now(), lang = window.PA_LANGUAGE === 'ar' ? 'ar':'en', t=words[lang];
    const nextSignature = `${loadState}/${lang}/${entries.map(e=>model.stateAt(e,now)).join('/')}`;
    if (signature !== nextSignature) {
      signature = nextSignature; root.replaceChildren(); counters=[];
      if(loadState !== 'ready' || !entries.length){const box=node('div','','catalog-state');box.append(node('h2',loadState==='loading'?t.loading:loadState==='error'?t.error:t.empty));if(loadState==='ready')box.append(node('p',invalid?t.invalid:t.detail));root.append(box);return;}
      if(invalid)root.append(node('p',t.invalid,'event-warning'));
      const grid=node('div','','catalog-grid'), past=node('div','','past-events');
      entries.forEach(event => {
        const state=model.stateAt(event,now), card=node('article','',state==='ended'?'ended-card':'catalog-card event-card');
        const localized=key=>typeof (lang==='ar'&&event[`${key}_ar`]||event[key])==='string'?(lang==='ar'&&event[`${key}_ar`]||event[key]):'';
        card.append(node('h2',localized('topic')),node('p',`${t.instructor}: ${localized('instructor')}`));
        if(localized('description')&&state!=='ended')card.append(node('p',localized('description')));
        const date=node('time',new Intl.DateTimeFormat(lang==='ar'?'ar-IQ':'en-GB',{timeZone:'Asia/Baghdad',year:'numeric',month:'long',day:'numeric',hour:'2-digit',minute:'2-digit',hour12:true}).format(event.start));date.dateTime=event.startAt;card.append(date,node('small',t.time,'event-timezone'));
        if(state==='upcoming'){
          const group=node('div','','countdown');group.setAttribute('role','group');group.setAttribute('aria-label',lang==='ar'?'الوقت المتبقي':'Time remaining');group.setAttribute('aria-live','off');
          const values=t.units.map(unit=>{const part=node('div',''),value=node('strong','0');part.append(value,node('span',unit));group.append(part);return value;});card.append(group);counters.push({event,values});
        } else {
          const status=node('p',state==='ended'?t.ended:t.available,'event-status');status.setAttribute('role','status');card.append(status);
          if(state==='available'){
            if(event.url){const link=node('a',`${localized('buttonLabel')||t.join} ↗`,'button primary');link.href=event.url;link.target='_blank';link.rel='noopener noreferrer';link.setAttribute('aria-label',`${localized('buttonLabel')||t.join}: ${localized('topic')} (${t.tab})`);card.append(link);}
            else card.append(node('p',t.unavailable));
          }
        }
        (state==='ended'?past:grid).append(card);
      });
      if(grid.childElementCount)root.append(grid);
      if(past.childElementCount)root.append(node('h2',t.endedHeading,'past-heading'),past);
    }
    counters.forEach(({event,values})=>model.countdown(event.start,now).forEach((value,i)=>{values[i].textContent=String(value).padStart(2,'0');}));
  };
  document.addEventListener('pa-language-change',()=>{signature='';tick();});
  document.addEventListener('visibilitychange',tick);window.addEventListener('pageshow',tick);window.addEventListener('focus',tick);
  tick();setInterval(tick,1000);
  fetch('/data/events.json',{cache:'no-cache'}).then(response=>{if(!response.ok)throw Error();return response.json();}).then(data=>{if(!Array.isArray(data))throw Error();({events:entries,invalid}=model.normalize(data));loadState='ready';tick();}).catch(()=>{loadState='error';tick();});
})();
