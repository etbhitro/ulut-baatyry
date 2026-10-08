// Улут Баатыры — интерактив
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

  // Параллакс гор
  const layers = document.querySelectorAll('.mountains .m');
  if (!reduceMotion && layers.length) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, window.innerHeight);
        layers.forEach(l => { l.style.transform = `translateY(${y * parseFloat(l.dataset.speed)}px)`; });
        ticking = false;
      });
    }, { passive: true });
  }

  // Подсветка карточек под курсором
  document.querySelectorAll('.spot').forEach(el => {
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });

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

  // Карусель туров
  const tours = document.getElementById('tours');
  document.querySelectorAll('.tour__nav .round-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = tours.querySelector('.tcard');
      tours.scrollBy({ left: (card.offsetWidth + 22) * Number(btn.dataset.dir), behavior: 'smooth' });
    });
  });

  // Счётчики
  const counters = document.querySelectorAll('[data-count]');
  const countIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, target = +el.dataset.count, suffix = el.dataset.suffix || '';
      const start = performance.now(), dur = reduceMotion ? 0 : 1600;
      const tick = now => {
        const p = dur ? Math.min((now - start) / dur, 1) : 1;
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      countIO.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => countIO.observe(c));

  // Форма (демо — отправка пока не подключена)
  const form = document.getElementById('form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    document.getElementById('formOk').hidden = false;
    form.reset();
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
