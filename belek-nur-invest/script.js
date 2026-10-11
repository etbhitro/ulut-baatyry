// Belek Nur Invest — интерактив лендинга (тексты на языке посетителя даёт ../i18n.js)
(() => {
  const t = window.ubT || (key => key);
  document.getElementById('year').textContent = new Date().getFullYear();

  // Шапка: светлый фон при прокрутке
  const header = document.getElementById('header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Список проектов в форме собирается из названий карточек и обновляется при смене языка
  const select = document.getElementById('project');
  const titles = [...document.querySelectorAll('.project h3')];
  const fillProjects = () => {
    const chosen = select.selectedIndex;
    select.length = 1;  // оставляем первый пункт «Пока не выбрал»
    titles.forEach(h => select.add(new Option(h.textContent.trim())));
    select.selectedIndex = chosen;
  };
  fillProjects();
  document.addEventListener('ub:lang', fillProjects);

  // «Запросить материалы» на карточке выбирает этот проект в форме
  document.querySelectorAll('[data-pick]').forEach(btn => btn.addEventListener('click', () => {
    const title = btn.closest('.project').querySelector('h3');
    select.selectedIndex = titles.indexOf(title) + 1;
  }));

  // Форма заявки → бэкенд (ulut-baatyry-agent, POST /api/leads, направление invest)
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
    // Бэкенд принимает одно поле message: собираем в него проект и текст посетителя
    data.message = ['Belek Nur Invest.', select.selectedIndex > 0 && `Проект: ${select.value}.`, details.value.trim()]
      .filter(Boolean).join(' ');
    try {
      const res = await fetch(form.dataset.api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(typeof body.detail === 'string' ? body.detail : t('js.form_check'));
      }
      formOk.hidden = false;
      form.reset();
    } catch (err) {
      formErr.textContent = err instanceof TypeError ? t('js.form_fail') : err.message;
      formErr.hidden = false;
    } finally {
      submitBtn.disabled = false;
    }
  });
})();
