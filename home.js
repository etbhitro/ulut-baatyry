// Улут-Баатыры — движение на главной: прогресс чтения, первый экран, превью направлений
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Полоска прогресса и лёгкий уход заголовка при прокрутке
  const bar = document.getElementById('progress');
  const hero = document.querySelector('.hero');
  const heroInner = document.getElementById('heroInner');
  let ticking = false;
  const onScroll = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
    if (hero) {
      // Первый экран гаснет, пока на него наезжает лист; дальше прячем совсем, чтобы не просвечивал
      const k = Math.min(y / (window.innerHeight * 0.55), 1);
      hero.style.opacity = (1 - k).toFixed(3);
      hero.style.visibility = k >= 1 ? 'hidden' : 'visible';
      if (heroInner && !reduceMotion) heroInner.style.transform = `translate3d(0, ${(k * -40).toFixed(1)}px, 0) scale(${(1 - k * 0.04).toFixed(4)})`;
    }
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(onScroll);
  }, { passive: true });
  onScroll();

  // Направления: при наведении на строку справа меняется картинка
  const rows = [...document.querySelectorAll('.row[data-preview]')];
  const images = [...document.querySelectorAll('.index__frame img')];
  const num = document.getElementById('previewNum');
  const show = row => {
    const i = Number(row.dataset.preview);
    images.forEach((img, n) => img.classList.toggle('is-on', n === i));
    rows.forEach(r => r.classList.toggle('is-active', r === row));
    if (num) num.textContent = String(i + 1).padStart(2, '0');
  };
  rows.forEach(row => {
    row.addEventListener('mouseenter', () => show(row));
    row.addEventListener('focus', () => show(row));
  });
  if (rows[0]) rows[0].classList.add('is-active');
})();
