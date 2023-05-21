const table = document.querySelector('.table');

if (table) {
  const tooltipEl = document.createElement('div');
  tooltipEl.classList.add('table-tooltip');
  document.body.appendChild(tooltipEl);

  table.addEventListener('mouseover', ({ target }) => {
    if (target.matches('.table-img')) {
      const x = target.getBoundingClientRect().right.toFixed();
      const y = target.getBoundingClientRect().bottom.toFixed();
      const imgPath = target.getAttribute('src');
      const altImg = target.getAttribute('alt');

      tooltipEl.innerHTML = `<img src="${imgPath}" alt="${altImg}">`
      tooltipEl.style.cssText = `left: ${x}px; top: ${y}px;`;
      tooltipEl.classList.add('active');

      target.addEventListener('mouseleave', ({ target }) => {
        if (target.matches('.table-img')) {
          console.log('leave');
          tooltipEl.classList.remove('active');
          tooltipEl.style.cssText = 'left: 0; top: 0;'

          return;
        }
      }, { once: true });
    }
  });
}
