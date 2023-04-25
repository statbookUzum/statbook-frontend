import { setHeight } from "./helper";

const tablesToHide = document.querySelectorAll('.table');

if (tablesToHide.length) {
  tablesToHide.forEach(table => {
    const hideTableButton = table.closest('.shop-report').querySelector('.hide-report-button');
    const tableContainer = table.closest('.table-container');

    hideTableButton.addEventListener('click', () => {
      if (!tableContainer.matches('.hidden')) {
        hideTableButton.classList.add('hidden');
        tableContainer.classList.add('hidden');
        tableContainer.style.maxHeight = 0;
      } else {
        hideTableButton.classList.remove('hidden');
        tableContainer.classList.remove('hidden');
        tableContainer.style.maxHeight = '1050px';
      }

      setHeight();
    });
  })
}
