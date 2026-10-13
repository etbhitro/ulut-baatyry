// Улут-Баатыры — общее движение на всех страницах: плавная прокрутка и появление блоков.
// Подключается после lenis.min.js; если библиотека не загрузилась, остаётся обычная прокрутка.
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;

  // Плавная инерционная прокрутка колесом. На телефонах прокрутка остаётся родной.
  if (window.Lenis && !reduceMotion) {
    const lenis = new window.Lenis({ duration: 1.15, smoothWheel: true });
    const raf = time => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    root.classList.add('smooth');

    // Якорные ссылки ведём той же плавной прокруткой
    document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
      const target = a.getAttribute('href').length > 1 && document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -70 });
    }));
  }

  // Внутренние страницы: у них нет script.js, блоки проявляем здесь
  if (document.body.classList.contains('subpage')) {
    const items = [...document.querySelectorAll('.back, .page-head__top, .project, .post')];
    items.forEach(el => el.classList.add('reveal'));
    if ('IntersectionObserver' in window && !reduceMotion) {
      const io = new IntersectionObserver(entries => entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }), { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
      items.forEach(el => io.observe(el));
    } else {
      items.forEach(el => el.classList.add('is-in'));
    }
  }
})();
