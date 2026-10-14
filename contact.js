'use strict';
(() => {
  const form=document.getElementById('contact-form');if(!form)return;
  const fieldset=form.querySelector('fieldset'),button=form.querySelector('button[type="submit"]'),status=document.getElementById('form-status'),unavailable=document.getElementById('form-unavailable');
  const raw=window.PA_CONFIG?.contactFormEndpoint || '';
  const endpoint=/^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(raw)?raw:null;
  const messages={en:{sending:'Sending…',success:'Your message was accepted. Thank you for getting in touch.',failure:'Your message could not be confirmed. Your text has been kept. Please try again or email us directly.',invalid:'Please complete the required fields, enter a valid email, and stay within the displayed limits.',spam:'We couldn’t submit this request. Please refresh and try again.',send:'Send message'},ar:{sending:'جارٍ الإرسال…',success:'تم قبول رسالتك. شكرًا لتواصلك معنا.',failure:'تعذّر تأكيد إرسال الرسالة. احتُفظ بالنص. حاول مجددًا أو راسلنا مباشرة.',invalid:'أكمل الحقول المطلوبة وأدخل بريدًا صحيحًا والتزم بالحدود الموضحة.',spam:'تعذّر إرسال الطلب. يرجى التحديث والمحاولة مجددًا.',send:'أرسل الرسالة'}};
  let state='',sending=false;
  const update=()=>{const t=messages[window.PA_LANGUAGE==='ar'?'ar':'en'];status.textContent=state?t[state]:'';button.textContent=sending?t.sending:t.send;};
  const email=window.PA_CONFIG?.email;
  if(typeof email==='string'&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){const link=document.getElementById('email-alternative');link.href=`mailto:${email}`;link.hidden=false;document.getElementById('email-address').textContent=email;}
  fieldset.disabled=!endpoint;unavailable.hidden=!!endpoint;
  document.addEventListener('pa-language-change',update);
  form.addEventListener('submit',async event=>{
    event.preventDefault();if(sending||!endpoint)return;
    const fields=['name','email','subject','message'];fields.forEach(name=>{form.elements[name].value=form.elements[name].value.trim();});
    const limits={name:100,email:254,subject:160,message:5000};
    const invalid=fields.some(name=>!form.elements[name].value||form.elements[name].value.length>limits[name]) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.elements.email.value);
    if(invalid||!form.reportValidity()){state='invalid';update();form.reportValidity();return;}
    if(form.elements._gotcha.value){state='spam';update();return;}
    const data=new FormData(form);
    sending=true;state='sending';fieldset.disabled=true;form.setAttribute('aria-busy','true');update();
    const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),20000);
    try{
      const response=await fetch(endpoint,{method:'POST',body:data,headers:{Accept:'application/json'},signal:controller.signal});
      const result=await response.json();
      if(!response.ok||result.ok!==true)throw Error('Not accepted');
      state='success';form.reset();
    }catch{state='failure';}
    finally{clearTimeout(timeout);sending=false;fieldset.disabled=false;form.setAttribute('aria-busy','false');update();}
  });
  form.addEventListener('invalid',()=>{state='invalid';update();},true);
  update();
})();
