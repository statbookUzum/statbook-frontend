const pageType = document.querySelector('.main').getAttribute('[data-page-type]');
const table = document.querySelector('[data-table-review]');

if (pageType === 'category') {
  table.addEventListener('click', ({ target }) => {
    if (target.matches('.table__link')) {
      console.log('link');
      const link = target.getAttribute('data-link');

      navigator.clipboard.writeText(link);

      target.classList.add('copy');

      setTimeout(() => {
        target.classList.remove('copy');
      }, 1500)
    }
  });
}
