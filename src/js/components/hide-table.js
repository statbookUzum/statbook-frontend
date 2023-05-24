import { tableList } from "./vars";
import { setHeight } from "./helper";

if (tableList.length) {
  tableList.forEach(table => {
    const hideTableButton = table.closest('.custom-tabs__panel').querySelector('.hide-report-button');
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
