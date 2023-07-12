import { tableList } from "./vars";
import { renderTable } from "./render-table";
import { tableHeaderTooltip } from "./helperTablePage/tableHeaderTooltip";

let tableData = null;

if (tableList.length) {
  let filterTypeDown = true;

  tableList.forEach((table) => {
    table.addEventListener("click", ({ target }) => {
      if (target.matches(".table__filter-button")) {
        const typeOfTable = target.getAttribute("data-table-type");

        sortTable(
          // review or analyze
          tableData[typeOfTable],
          target.getAttribute("data-index-sort"),
          target.getAttribute("data-filter-type")
        );
        renderTable(tableData, [table]);
        tableHeaderTooltip();

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
