import * as XLSX from '../../../node_modules/xlsx/xlsx.mjs';

const downloadBtn = document.querySelector('.report-btn');

let dataForXlsx = null;
let nameOfXlsx = 'Данные';

downloadBtn.addEventListener('click', () => {
  if (!dataForXlsx) return;

  const workbook = XLSX.utils.book_new();
  const sheet = XLSX.utils.aoa_to_sheet(dataForXlsx);
  XLSX.utils.book_append_sheet(workbook, sheet, nameOfXlsx);

  XLSX.writeFile(workbook, `${nameOfXlsx}_statbook_report.xlsx`);
});


export function setDataToXlsx(data, title) {
  dataForXlsx = data;
  nameOfXlsx = title;
}
