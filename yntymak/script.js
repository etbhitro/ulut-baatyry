// Ынтымак Тур — интерактив лендинга
(() => {
  document.getElementById('year').textContent = new Date().getFullYear();

  // Шапка: фон при прокрутке
  const header = document.getElementById('header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // «Хочу сюда» на карточке подставляет направление в форму
  const place = document.getElementById('place');
  document.querySelectorAll('[data-place]').forEach(link => link.addEventListener('click', () => {
    place.value = link.dataset.place;
  }));

  // Форма заявки → бэкенд (ulut-baatyry-agent, POST /api/leads, направление tour)
  const form = document.getElementById('form');
  const details = document.getElementById('details');
  const formOk = document.getElementById('formOk');
  const formErr = document.getElementById('formErr');
  const submitBtn = form.querySelector('button[type="submit"]');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    formOk.hidden = true;
    formErr.hidden = true;
    submitBtn.disabled = true;
    const data = Object.fromEntries(new FormData(form));
    // Бэкенд принимает одно поле message: собираем в него направление и детали поездки
    data.message = ['Ынтымак Тур, тур по Кыргызстану.', place.value && `Куда: ${place.value}.`, details.value.trim()]
      .filter(Boolean).join(' ');
    try {
      const res = await fetch(form.dataset.api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(typeof body.detail === 'string' ? body.detail : 'Проверьте имя и телефон.');
      }
      formOk.hidden = false;
      form.reset();
    } catch (err) {
      formErr.textContent = err instanceof TypeError
        ? 'Не удалось отправить заявку. Позвоните нам или напишите в Telegram.'
        : err.message;
      formErr.hidden = false;
    } finally {
      submitBtn.disabled = false;
    }
  });
})();
