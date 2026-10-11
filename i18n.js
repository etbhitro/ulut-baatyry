// Улут-Баатыры — языки сайта: русский (в самой разметке), кыргызский и английский.
// Как добавить текст: поставить элементу data-i18n="ключ" и дописать перевод ключа в kg и en ниже.
// Русский текст берётся прямо из index.html, здесь лежат только строки, которых в разметке нет.
(() => {
  const I18N = {
    ru: {
      'js.form_check': 'Проверьте имя и телефон.',
      'js.form_fail': 'Не удалось отправить заявку. Проверьте интернет или напишите нам в Telegram.',
      'js.chat_greeting': 'Здравствуйте! Я цифровой помощник «Улут-Баатыры». Спросите о наших направлениях или сотрудничестве — подскажу и передам специалисту.',
      'js.chat_fail': 'Не удалось отправить сообщение.',
      'js.chat_offline': 'Нет связи. Проверьте интернет или напишите нам в Telegram.',
    },

    kg: {
      'meta.title': 'Улут-Баатыры — мурастан улуу келечекке',
      'meta.description': '«Улут-Баатыры»: мурастан — улуу келечекке. Жерибизди жана салтыбызды сактаган, Кыргызстандын келечеги үчүн иштеген долбоорлор жана кызматтар.',
      'intro.sub': 'Мурастан — улуу келечекке',
      'intro.hint': 'Чабандести басыңыз',
      'nav.directions': 'Багыттар',
      'nav.contact': 'Байланыш',
      'header.cta': 'Байланышуу',
      'hero.eyebrow': 'Улут баатырлары · Кыргызстан',
      'hero.title': 'Улут-Баатыры.',
      'hero.slogan': 'Мурастан&nbsp;— улуу келечекке',
      'hero.lead': 'Жерибизди, тарыхыбызды жана салтыбызды сактайбыз&nbsp;— жана алардын негизинде кийинки муундарга кала турган долбоорлорду курабыз.',
      'hero.btn2': 'Биз менен байланышуу',
      'd1.h': 'Туризм жана эс алуу',
      'd1.p': 'Туристтик комплекс, агротуризм жана даяр саякаттар: билеттен тартып сапарды уюштурууга чейин.',
      'd2.h': 'Жаштар жана тарбия',
      'd2.p': 'Насаатчылар менен лагердик сменалар: дене тарбия, тарых жана маданият, тартип, лидерлик.',
      'd4.h': 'Инвестициялык долбоорлор',
      'd4.p': 'Ар кандай аянттагы жер тилкелериндеги туристтик жана өнөр жай зоналары.',
      'soon.num': 'Жакында',
      'soon.h': 'Жаңы кызматтар',
      'soon.p': 'Дагы бир нече багытты ишке киргизүүгө даярдап жатабыз. Алар тууралуу ушул жерден айтып беребиз.',
      'dir.cta': 'Багыт боюнча суроо берүү',
      'contact.h2': 'Келиңиз, бирге<br>куралы',
      'contact.lead': 'Билдирме калтырыңыз, жумуш күнүнүн ичинде сиз менен байланышабыз.',
      'contact.phone': 'Телефон',
      'contact.address': 'Дарек',
      'contact.later': 'кийин толтурабыз',
      'form.name': 'Атыңыз',
      'form.name_ph': 'Сизге кантип кайрылалы',
      'form.phone': 'Телефон',
      'form.direction': 'Багыт',
      'opt.tour': 'Туризм жана эс алуу',
      'opt.patriot': 'Жаштар программалары',
      'opt.invest': 'Инвестициялык долбоорлор',
      'opt.other': 'Башка',
      'form.message': 'Билдирүү',
      'form.message_ph': 'Кантип жардам бере аларыбызды жазыңыз',
      'form.submit': 'Билдирме жөнөтүү',
      'form.ok': 'Рахмат! Билдирме кабыл алынды, жумуш күнүнүн ичинде сиз менен байланышабыз.',
      'form.alt': 'Же бизге <a href="https://t.me/Ulut_Baatyry_bot" target="_blank" rel="noopener">Telegram</a> аркылуу жазыңыз&nbsp;— дароо жооп беребиз.',
      'strip.label': 'Өнөктөштөр',
      'footer.slogan': 'Мурастан&nbsp;— улуу келечекке.',
      'footer.site': 'Сайт',
      'footer.contact': 'Байланыш',
      'footer.lead': 'Билдирме калтыруу',
      'footer.tgbot': 'Telegram-бот',
      'footer.rights': 'Улут-Баатыры. Бардык укуктар корголгон.',
      'footer.love': 'Кыргызстанга сүйүү менен жасалды',
      'chat.launch': 'Суроо берүү',
      'chat.title': '«Улут-Баатыры» жардамчысы',
      'chat.sub': 'Санарип жардамчы · дароо жооп берет',
      'chat.ph': 'Билдирүү жазыңыз…',
      'chat.foot_q': 'Мессенджерде ыңгайлуубу?',
      'chat.foot_link': 'Telegramда улантуу',
      'd4.more': 'Долбоорлорду көрүү',
      'inv.page_title': 'Инвестициялык долбоорлор — Улут-Баатыры',
      'inv.back': 'Бардык багыттар',
      'inv.eyebrow': 'Багыт',
      'inv.lead': 'Ар бир долбоор боюнча материалдарды сурам боюнча жөнөтөбүз.',
      'inv.cover_alt': 'Күн батып бараткандагы көл жээгиндеги курорттук комплекс',
      'inv.tag': 'Туристтик зона · 1 га',
      'inv.title': 'Ысык-Көлдүн жээгиндеги курорттук комплекс',
      'inv.text': 'Концепция даяр: башкы план, пландоолор жана фасаддар. Материалдарды сурам боюнча жөнөтөбүз.',
      'inv.cta': 'Материалдарды суроо',
      'inv2.cover_alt': 'Көл жээгиндеги турак үйдүн курулушу',
      'inv2.tag': 'Турак жай курулушу · 11 га',
      'inv2.title': 'Ысык-Көлдөгү турак жай комплекси',
      'inv2.text': 'Модулдук-блоктук технология менен курулуучу беш кабаттуу үйлөр, көрктөндүрүлгөн короолор, жашыл аймактар жана унаа токтотуучу жайлар. Статусу: ишке ашырууга даярдык.',
      'js.form_check': 'Атыңызды жана телефонуңузду текшериңиз.',
      'js.form_fail': 'Билдирме жөнөтүлгөн жок. Интернетти текшериңиз же бизге Telegram аркылуу жазыңыз.',
      'js.chat_greeting': 'Саламатсызбы! Мен «Улут-Баатыры» санарип жардамчысымын. Багыттарыбыз же кызматташуу тууралуу сураңыз — айтып берем жана адиске өткөрөм.',
      'js.chat_fail': 'Билдирүү жөнөтүлгөн жок.',
      'js.chat_offline': 'Байланыш жок. Интернетти текшериңиз же бизге Telegram аркылуу жазыңыз.',
    },

    en: {
      'meta.title': 'Ulut-Baatyry — from heritage to a great future',
      'meta.description': 'Ulut-Baatyry (“Heroes of the Nation”): from heritage to a great future. Projects and services that care for the land and traditions of Kyrgyzstan and work for its future.',
      'intro.sub': 'Heroes of the Nation',
      'intro.hint': 'Tap the horseman',
      'nav.directions': 'What we do',
      'nav.contact': 'Contact',
      'header.cta': 'Get in touch',
      'hero.eyebrow': 'Heroes of the Nation · Kyrgyzstan',
      'hero.title': 'Ulut-Baatyry.',
      'hero.slogan': 'From heritage to&nbsp;a&nbsp;great future',
      'hero.lead': 'We care for our land, history and traditions&nbsp;— and build on them projects that will remain for the generations to come.',
      'hero.btn2': 'Contact us',
      'd1.h': 'Tourism and leisure',
      'd1.p': 'A tourist complex, agritourism and fully arranged trips: from tickets to the whole journey.',
      'd2.h': 'Youth and upbringing',
      'd2.p': 'Camp sessions with mentors: physical training, history and culture, discipline, leadership.',
      'd4.h': 'Investment projects',
      'd4.p': 'Tourist and industrial zones on plots of different sizes.',
      'soon.num': 'Soon',
      'soon.h': 'New services',
      'soon.p': 'We are preparing several more areas for launch. We will tell you about them here.',
      'dir.cta': 'Ask about an area',
      'contact.h2': 'Let’s build<br>together',
      'contact.lead': 'Leave a request and we will get back to you within one working day.',
      'contact.phone': 'Phone',
      'contact.address': 'Address',
      'contact.later': 'coming soon',
      'form.name': 'Your name',
      'form.name_ph': 'How should we address you',
      'form.phone': 'Phone',
      'form.direction': 'Area',
      'opt.tour': 'Tourism and leisure',
      'opt.patriot': 'Youth programmes',
      'opt.invest': 'Investment projects',
      'opt.other': 'Other',
      'form.message': 'Message',
      'form.message_ph': 'Tell us how we can help',
      'form.submit': 'Send request',
      'form.ok': 'Thank you! Your request has been received, we will get back to you within one working day.',
      'form.alt': 'Or message us on <a href="https://t.me/Ulut_Baatyry_bot" target="_blank" rel="noopener">Telegram</a>&nbsp;— we reply right away.',
      'strip.label': 'Partners',
      'footer.slogan': 'From heritage to a great future.',
      'footer.site': 'Site',
      'footer.contact': 'Contact',
      'footer.lead': 'Leave a request',
      'footer.tgbot': 'Telegram bot',
      'footer.rights': 'Ulut-Baatyry. All rights reserved.',
      'footer.love': 'Made with love for Kyrgyzstan',
      'chat.launch': 'Ask a question',
      'chat.title': 'Ulut-Baatyry assistant',
      'chat.sub': 'Digital assistant · replies right away',
      'chat.ph': 'Type a message…',
      'chat.foot_q': 'Prefer a messenger?',
      'chat.foot_link': 'Continue in Telegram',
      'd4.more': 'View projects',
      'inv.page_title': 'Investment projects — Ulut-Baatyry',
      'inv.back': 'All areas',
      'inv.eyebrow': 'Area',
      'inv.lead': 'Materials on each project are sent on request.',
      'inv.cover_alt': 'Lakeside resort complex at sunset',
      'inv.tag': 'Tourist zone · 1 ha',
      'inv.title': 'Resort complex on the shore of Issyk-Kul',
      'inv.text': 'The concept is ready: master plan, layouts and elevations. Materials are sent on request.',
      'inv.cta': 'Request materials',
      'inv2.cover_alt': 'A residential building under construction by the lake',
      'inv2.tag': 'Residential development · 11 ha',
      'inv2.title': 'Residential complex at Issyk-Kul',
      'inv2.text': 'Five-storey buildings using modular block construction, landscaped courtyards, green areas and parking. Status: preparing for implementation.',
      'js.form_check': 'Please check your name and phone number.',
      'js.form_fail': 'The request could not be sent. Check your connection or message us on Telegram.',
      'js.chat_greeting': 'Hello! I am the Ulut-Baatyry digital assistant. Ask about what we do or about working together — I will help and pass you on to a specialist.',
      'js.chat_fail': 'The message could not be sent.',
      'js.chat_offline': 'No connection. Check your internet or message us on Telegram.',
    },
  };

  const LANGS = ['ru', 'kg', 'en'];
  const HTML_LANG = { ru: 'ru', kg: 'ky', en: 'en' };
  const STORE_KEY = 'ubLang';
  const root = document.documentElement;
  const nodes = [...document.querySelectorAll('[data-i18n]')];
  const attrNodes = [...document.querySelectorAll('[data-i18n-attr]')];
  const metaDesc = document.querySelector('meta[name="description"]');

  // Russian lives in the markup: remember it before the first switch.
  nodes.forEach(el => { if (!(el.dataset.i18n in I18N.ru)) I18N.ru[el.dataset.i18n] = el.innerHTML; });
  attrNodes.forEach(el => el.dataset.i18nAttr.split(';').forEach(pair => {
    const [attr, key] = pair.split(':');
    if (!(key in I18N.ru)) I18N.ru[key] = el.getAttribute(attr);
  }));
  // A page may name its own title key: <html data-title-key="...">
  const TITLE_KEY = root.dataset.titleKey || 'meta.title';
  I18N.ru[TITLE_KEY] = document.title;
  I18N.ru['meta.description'] = metaDesc.content;

  let current = 'ru';
  const t = key => I18N[current][key] ?? I18N.ru[key] ?? key;

  const apply = lang => {
    current = LANGS.includes(lang) ? lang : 'ru';
    root.lang = HTML_LANG[current];
    nodes.forEach(el => { el.innerHTML = t(el.dataset.i18n); });
    attrNodes.forEach(el => el.dataset.i18nAttr.split(';').forEach(pair => {
      const [attr, key] = pair.split(':');
      el.setAttribute(attr, t(key));
    }));
    document.title = t(TITLE_KEY);
    if (TITLE_KEY === 'meta.title') metaDesc.content = t('meta.description');
    document.querySelectorAll('[data-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === current)));
  };

  // Choice order: ?lang= in the address, then the visitor's earlier choice, then Russian.
  let initial = new URLSearchParams(location.search).get('lang');
  if (!LANGS.includes(initial)) {
    try { initial = localStorage.getItem(STORE_KEY); } catch (e) { initial = null; }
  }
  if (initial && initial !== 'ru') apply(initial);

  document.querySelectorAll('[data-lang]').forEach(btn => btn.addEventListener('click', () => {
    apply(btn.dataset.lang);
    try { localStorage.setItem(STORE_KEY, current); } catch (e) {}
    document.dispatchEvent(new CustomEvent('ub:lang', { detail: current }));
  }));

  window.ubT = t;
})();
