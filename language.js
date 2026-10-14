'use strict';
(() => {
  // English text is authored in index.html; its Arabic equivalents live here.
  // Keep dictionary keys in sync when changing English copy.
  const arabic = {
    '100 characters maximum': 'الحد الأقصى 100 حرف', '160 characters maximum': 'الحد الأقصى 160 حرف', '5000 characters maximum': 'الحد الأقصى 5000 حرف',
    'Upcoming Events': 'الفعاليات القادمة', 'Contact': 'تواصل معنا',
    'UPCOMING EVENTS': 'الفعاليات القادمة', 'Make time for learning.': 'خصص وقتًا للتعلّم.',
    'Your next session.': 'جلستك القادمة.',
    'Lecture and course schedules, with live countdowns in Baghdad time.': 'مواعيد المحاضرات والدورات مع عدّ تنازلي مباشر بتوقيت بغداد.',
    'CONTACT': 'تواصل معنا', 'Start a conversation.': 'لنبدأ حوارًا.',
    'We’re here to help.': 'نحن هنا لمساعدتك.',
    'Ask about a course, request a consultation, or get support with a tool.': 'استفسر عن دورة أو اطلب استشارة أو احصل على مساعدة بشأن أداة.',
    'Name': 'الاسم', 'Request type': 'نوع الطلب', 'Subject': 'الموضوع', 'Message': 'الرسالة',
    'Consultation': 'استشارة', 'Course inquiry': 'استفسار عن دورة', 'Tool support': 'دعم الأدوات', 'Other': 'أخرى',
    'Send message': 'أرسل الرسالة',
    'All fields except request type are required.': 'جميع الحقول باستثناء نوع الطلب مطلوبة.',
    'Your contact details are used to respond to your request. Submissions are processed by Formspree.': 'تُستخدم بيانات التواصل للرد على طلبك. تعالج خدمة Formspree الرسائل المُرسلة.',
    'The contact form is currently unavailable.': 'نموذج التواصل غير متاح حاليًا.',
    'Please use direct email instead.': 'يرجى التواصل مباشرة عبر البريد الإلكتروني.',
    'Email us directly': 'راسلنا مباشرة',
    'Home': 'الرئيسية', 'Tools': 'الأدوات', 'Courses & Lectures': 'الدورات والمحاضرات',
    'ENGINEERING TOOLKIT': 'أدوات هندسية', 'Engineering tools.': 'أدوات هندسية.',
    'Practical applications.': 'تطبيقات عملية.',
    'Explore engineering tools in one place. Open each application directly on its own platform.': 'استكشف الأدوات الهندسية في مكان واحد، وافتح كل تطبيق مباشرة على منصته.',
    'COURSES & LECTURES': 'الدورات والمحاضرات', 'Build your knowledge.': 'طوّر معرفتك.',
    'Keep learning.': 'واصل التعلّم.',
    'Explore educational offerings in petroleum engineering, from focused lectures to practical courses.': 'استكشف فرص التعلّم في هندسة النفط، من المحاضرات المتخصصة إلى الدورات العملية.',
    'Browse Tools': 'تصفح الأدوات', 'Browse Courses & Lectures': 'تصفح الدورات والمحاضرات',
    'Loading listings…': 'جارٍ تحميل القائمة…',
    'Enable JavaScript to load the listings.': 'فعّل جافاسكريبت لعرض القائمة.',
    'Skip to content': 'انتقل إلى المحتوى',
    'Petroleum': 'بتروليوم', 'Academia': 'أكاديميا',
    'Petroleum Academia': 'بتروليوم أكاديميا',
    'About': 'من نحن', 'Our focus': 'مجالاتنا', 'Resources': 'المصادر',
    'Let’s connect': 'تواصل معنا',
    'KNOWLEDGE INTO PRACTICE': 'من المعرفة إلى التطبيق',
    'Practical Petroleum Engineering': 'تعليم عملي',
    'Education.': 'في هندسة النفط.',
    'Educational resources, courses, and practical tools that connect engineering theory with real-world understanding. With reservoir engineering at the core.': 'مصادر تعليمية ودورات وأدوات عملية تربط النظريات الهندسية بفهم الواقع التطبيقي، مع التركيز على هندسة المكامن.',
    'Explore Resources': 'استكشف المصادر', 'Connect With Us': 'تواصل معنا',
    'For curious students. For practicing engineers.': 'للطلاب الشغوفين بالمعرفة. وللمهندسين الممارسين.',
    'THE SUBSURFACE, UNDERSTOOD.': 'فهم ما تحت السطح.',
    'SURFACE': 'السطح', 'RESERVOIR': 'المكمن',
    'A DEEPER UNDERSTANDING': 'فهم أعمق', '01 / RESERVOIR': '01 / المكمن',
    'LEARN THE PRINCIPLES.': 'تعلّم المبادئ.', 'UNDERSTAND THE DATA.': 'افهم البيانات.', 'APPLY THE ENGINEERING.': 'طبّق المعرفة الهندسية.',
    '01 / ABOUT US': '01 / من نحن',
    'Engineering knowledge.': 'معرفة هندسية.', 'Practical perspective.': 'رؤية عملية.',
    'Petroleum Academia is a learning platform for people who want to understand petroleum engineering beyond the equations.': 'بتروليوم أكاديميا منصة تعليمية لمن يريد فهم هندسة النفط بما يتجاوز المعادلات.',
    'We share educational resources, courses, and practical tools with a focus on reservoir engineering. Our approach brings concepts, data interpretation, and engineering applications together to make technical learning clear and useful.': 'نشارك مصادر تعليمية ودورات وأدوات عملية تركز على هندسة المكامن. يجمع نهجنا بين المفاهيم وتفسير البيانات والتطبيقات الهندسية لتقديم تعلّم تقني واضح ومفيد.',
    'Discover our focus areas': 'تعرّف على مجالاتنا',
    '02 / OUR FOCUS': '02 / مجالاتنا', 'Explore beneath': 'استكشف ما', 'the surface.': 'تحت السطح.',
    'Six connected areas.': 'ستة مجالات مترابطة.', 'One practical learning approach.': 'نهج تعليمي عملي واحد.',
    'Reservoir Engineering': 'هندسة المكامن',
    'Understand reservoir behavior and the principles behind development and recovery.': 'افهم سلوك المكامن والمبادئ التي تقوم عليها عمليات التطوير والاستخلاص.',
    'Reservoir Surveillance': 'مراقبة المكامن',
    'Connect production and pressure data to a clearer picture of reservoir performance.': 'اربط بيانات الإنتاج والضغط للحصول على صورة أوضح لأداء المكمن.',
    'Pressure Transient Analysis': 'تحليل الضغط العابر',
    'Explore well-test interpretation and what pressure responses reveal about the subsurface.': 'استكشف تفسير اختبارات الآبار وما تكشفه استجابات الضغط عن خصائص المكمن.',
    'Waterflooding & VRR': 'الحقن بالماء ونسبة تعويض الفراغات',
    'Study injection, voidage replacement, and their role in reservoir management.': 'تعلّم مبادئ الحقن وتعويض الفراغات ودورهما في إدارة المكامن.',
    'Material Balance': 'الموازنة المادية',
    'Build an understanding of reservoir drive mechanisms and fluid-volume relationships.': 'طوّر فهمك لآليات الدفع في المكامن والعلاقات بين أحجام الموائع.',
    'Engineering Applications': 'التطبيقات الهندسية',
    'Bring concepts into practice through calculation, interpretation, and useful tools.': 'حوّل المفاهيم إلى تطبيقات عملية من خلال الحسابات والتفسير والأدوات المفيدة.',
    '03 / LEARNING RESOURCES': '03 / مصادر التعلّم', 'Keep your curiosity': 'واصل الاستكشاف', 'moving forward.': 'وطوّر معرفتك.',
    'Courses, educational applications, and learning content.': 'دورات وتطبيقات تعليمية ومحتوى معرفي.',
    'A place to build on what you know.': 'مساحة للبناء على ما تعرفه.',
    'Learning starts with a connection.': 'التعلّم يبدأ بالتواصل.',
    'Follow Petroleum Academia on LinkedIn and Instagram for educational content and resource updates.': 'تابع بتروليوم أكاديميا على لينكدإن وإنستغرام للاطلاع على المحتوى التعليمي ومستجدات المصادر.',
    'Find us online': 'تابعنا عبر الإنترنت', '04 / CONNECT WITH US': '04 / تواصل معنا',
    'Let’s talk': 'لنتحدث عن', 'petroleum engineering': 'هندسة النفط',
    'Stay connected, explore new ideas, or get in touch.': 'ابقَ على تواصل، واستكشف أفكارًا جديدة، أو تواصل معنا مباشرة.',
    'We’d be glad to hear from you.': 'يسعدنا أن نسمع منك.',
    'LinkedIn': 'لينكدإن', 'Instagram': 'إنستغرام', 'Facebook': 'فيسبوك', 'Telegram': 'تيليغرام',
    'Ideas, insights & professional connections': 'أفكار ورؤى وتواصل مهني', 'Learning content & updates': 'محتوى تعليمي ومستجدات',
    'Connect with our community': 'تواصل مع مجتمعنا', 'Follow our updates': 'تابع مستجداتنا',
    'Email': 'البريد الإلكتروني', 'Phone': 'الهاتف', 'Call now!': 'اتصل الآن!',
    'Resource': 'مصدر',
    'Practical knowledge. Lasting understanding.': 'معرفة عملية. فهم راسخ.', 'Back to top ↑': 'العودة إلى الأعلى ↑'
  };
  const attributeTranslations = {
    'Petroleum Academia home': 'بتروليوم أكاديميا — الصفحة الرئيسية',
    'Main navigation': 'التنقل الرئيسي', 'Contact channels': 'قنوات التواصل',
    'Illustrative reservoir cross-section showing geological layers, a well, and fluid movement': 'مقطع توضيحي للمكمن يُظهر الطبقات الجيولوجية وبئرًا وحركة الموائع'
  };
  const button = document.getElementById('language-toggle');
  const textEntries = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.parentElement.closest('script, style, noscript, #language-toggle')) continue;
    const original = node.nodeValue;
    const key = original.trim();
    if (arabic[key]) textEntries.push({ node, original, translated: original.replace(key, arabic[key]) });
  }
  const attributes = [];
  document.querySelectorAll('[aria-label], img[alt]').forEach(element => {
    for (const name of ['aria-label', 'alt']) {
      const original = element.getAttribute(name);
      if (!original) continue;
      let translated = attributeTranslations[original] || arabic[original];
      if (original.endsWith(' (opens in a new tab)')) {
        const label = original.replace(' (opens in a new tab)', '');
        translated = `${arabic[label] || label} (يفتح في علامة تبويب جديدة)`;
      }
      if (translated) attributes.push({ element, name, original, translated });
    }
  });
  const originalTitle = document.title;
  const description = document.querySelector('meta[name="description"]');
  const originalDescription = description.content;
  let language = 'en';
  const setLanguage = value => {
    language = value === 'ar' ? 'ar' : 'en';
    const isArabic = language === 'ar';
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
    textEntries.forEach(entry => { entry.node.nodeValue = isArabic ? entry.translated : entry.original; });
    attributes.forEach(entry => entry.element.setAttribute(entry.name, isArabic ? entry.translated : entry.original));
    const pageName = document.getElementById('catalog')?.dataset.kind || document.body.dataset.page;
    document.title = isArabic ? `${pageName === 'tools' ? 'الأدوات' : pageName === 'courses' ? 'الدورات والمحاضرات' : pageName === 'upcoming' ? 'الفعاليات القادمة' : pageName === 'contact' ? 'تواصل معنا' : 'تعليم عملي في هندسة النفط'} | بتروليوم أكاديميا` : originalTitle;
    description.content = isArabic ? 'مصادر تعليمية ودورات وأدوات عملية في هندسة النفط مع التركيز على هندسة المكامن. تواصل مع بتروليوم أكاديميا.' : originalDescription;
    button.setAttribute('aria-label', isArabic ? 'Switch to English' : 'التبديل إلى العربية');
    button.title = isArabic ? 'Switch to English' : 'التبديل إلى العربية';
    const label = button.querySelector('span');
    label.textContent = isArabic ? 'English' : 'العربية';
    label.lang = isArabic ? 'en' : 'ar'; label.dir = isArabic ? 'ltr' : 'rtl';
    window.PA_LANGUAGE = language;
    document.dispatchEvent(new CustomEvent('pa-language-change', { detail: language }));
    try { localStorage.setItem('pa-language', language); } catch { /* Storage can be unavailable. */ }
  };
  let saved;
  try { saved = localStorage.getItem('pa-language'); } catch { /* Default to English. */ }
  setLanguage(saved);
  button.hidden = false;
  button.addEventListener('click', () => setLanguage(language === 'en' ? 'ar' : 'en'));
})();
