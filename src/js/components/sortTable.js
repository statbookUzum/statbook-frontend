import { tableList } from "./vars";
import { renderTable } from "./render-table";

let tableData = null;

if (tableList.length) {
  let filterTypeDown = true;

  tableList.forEach(table => {
    table.addEventListener('click', ({ target }) => {
      if (target.matches('.table__filter-button')) {

        if (target.getAttribute('data-table-type') === 'analyze') {
          sortTable(tableData.analyze, target.getAttribute('data-index-sort'), target.getAttribute('data-filter-type'));
          renderTable(tableData, [table]);
        }

        if (target.getAttribute('data-table-type') === 'review') {
          sortTable(tableData.review, target.getAttribute('data-index-sort'), target.getAttribute('data-filter-type'));
          renderTable(tableData, [table]);
        }

        filterTypeDown = !filterTypeDown;
      }
    });
  });

  function sortTable(table, i) {
    if (!table) return;

    table.sort((a, b) => {
      if (filterTypeDown) {
        return a[i] - b[i];
      }

      return b[i] - a[i];
    });
  }

}

export function setTableData(data) {
  tableData = data;
}
