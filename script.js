// Улут Баатыры — интерактив
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const t = window.ubT || (key => key);  // тексты на языке посетителя, см. i18n.js

  // Шапка: фон при прокрутке
  const header = document.getElementById('header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 30);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Мобильное меню
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', open);
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  }));

  // Появление элементов при прокрутке (с лёгкой задержкой для соседей)
  const startReveals = () => {
    const reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && !reduceMotion) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          const siblings = [...e.target.parentElement.children].filter(el => el.classList.contains('reveal'));
          e.target.style.setProperty('--d', `${Math.min(siblings.indexOf(e.target), 6) * 0.08}s`);
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      reveals.forEach(el => io.observe(el));
    } else {
      reveals.forEach(el => el.classList.add('is-in'));
    }
  };
  startReveals();

  // Фон: на первом экране фото резкое, при прокрутке мягко размывается и слегка светлеет
  const backdrop = document.querySelector('.backdrop');
  if (backdrop) {
    let ticking = false;
    const fade = () => {
      // плавный разгон и торможение на протяжении чуть больше одного экрана
      const t = Math.min(window.scrollY / (window.innerHeight * 1.15), 1);
      backdrop.style.setProperty('--fade', (t * t * (3 - 2 * t)).toFixed(3));
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(fade);
    }, { passive: true });
    fade();
  }

  // Активный пункт меню
  const links = [...nav.querySelectorAll('a')];
  const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const navIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => navIO.observe(s));

  // Адреса страниц сервисов — заполнить здесь. Пока адрес пуст, карточка ведёт на форму контактов.
  const SERVICES = {
    auto: '',    // Белек Авто
    ndws: '',    // NDWS
    realty: '',  // Недвижимость и земли
  };
  document.querySelectorAll('.service[data-service]').forEach(card => {
    const url = SERVICES[card.dataset.service];
    if (!url) return;
    card.href = url;
    card.target = '_blank';
    card.rel = 'noopener';
  });

  // Форма заявки → бэкенд (ulut-baatyry-agent, POST /api/leads)
  const form = document.getElementById('form');
  const formOk = document.getElementById('formOk');
  const formErr = document.getElementById('formErr');
  const submitBtn = form.querySelector('button[type="submit"]');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    formOk.hidden = true;
    formErr.hidden = true;
    submitBtn.disabled = true;
    try {
      const res = await fetch(form.dataset.api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(typeof data.detail === 'string' ? data.detail : t('js.form_check'));
      }
      formOk.hidden = false;
      form.reset();
    } catch (err) {
      formErr.textContent = err instanceof TypeError
        ? t('js.form_fail')
        : err.message;
      formErr.hidden = false;
    } finally {
      submitBtn.disabled = false;
    }
  });

  // Чат с помощником → бэкенд (ulut-baatyry-agent, /api/chat)
  const chat = document.getElementById('chat');
  if (chat) {
    const api = chat.dataset.api;
    const launcher = document.getElementById('chatLauncher');
    const panel = document.getElementById('chatPanel');
    const log = document.getElementById('chatLog');
    const chatForm = document.getElementById('chatForm');
    const input = document.getElementById('chatInput');
    const sendBtn = chatForm.querySelector('.chat__send');
    const SESSION_KEY = 'ubChatSession';
    let loaded = false;

    // localStorage may be unavailable (private mode): the chat still works, just without memory.
    const getSession = () => { try { return localStorage.getItem(SESSION_KEY); } catch (e) { return null; } };
    const setSession = id => { try { localStorage.setItem(SESSION_KEY, id); } catch (e) {} };

    const addMsg = (text, who) => {
      const el = document.createElement('div');
      el.className = `chat__msg chat__msg--${who}`;
      el.textContent = text;
      log.appendChild(el);
      log.scrollTop = log.scrollHeight;
      return el;
    };

    const loadHistory = async () => {
      loaded = true;
      const sid = getSession();
      let messages = [];
      if (sid) {
        try {
          const res = await fetch(`${api}/history?session_id=${encodeURIComponent(sid)}`);
          if (res.ok) messages = (await res.json()).messages || [];
        } catch (e) { /* offline: start with the greeting */ }
      }
      addMsg(t('js.chat_greeting'), 'bot');
      messages.forEach(m => addMsg(m.content, m.role === 'user' ? 'me' : 'bot'));
    };

    const open = () => {
      panel.hidden = false;
      chat.classList.add('is-open');
      launcher.setAttribute('aria-expanded', 'true');
      if (!loaded) loadHistory();
      input.focus();
    };
    const close = () => {
      panel.hidden = true;
      chat.classList.remove('is-open');
      launcher.setAttribute('aria-expanded', 'false');
      launcher.focus();
    };
    launcher.addEventListener('click', open);
    document.getElementById('chatClose').addEventListener('click', close);
    panel.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

    const autosize = () => { input.style.height = 'auto'; input.style.height = `${Math.min(input.scrollHeight, 120)}px`; };
    input.addEventListener('input', autosize);
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); chatForm.requestSubmit(); }
    });

    chatForm.addEventListener('submit', async e => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text || sendBtn.disabled) return;
      addMsg(text, 'me');
      input.value = '';
      autosize();
      sendBtn.disabled = true;
      const typing = document.createElement('div');
      typing.className = 'chat__typing';
      typing.innerHTML = '<i></i><i></i><i></i>';
      log.appendChild(typing);
      log.scrollTop = log.scrollHeight;
      try {
        const res = await fetch(api, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: getSession(), message: text, website: chatForm.website.value }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(typeof data.detail === 'string' ? data.detail : t('js.chat_fail'));
        setSession(data.session_id);
        addMsg(data.reply, 'bot');
      } catch (err) {
        addMsg(err instanceof TypeError
          ? t('js.chat_offline')
          : err.message, 'err');
      } finally {
        typing.remove();
        sendBtn.disabled = false;
        input.focus();
      }
    });
  }

  document.getElementById('year').textContent = new Date().getFullYear();
})();
