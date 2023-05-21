import * as XLSX from '../../../node_modules/xlsx/xlsx.mjs';

const downloadBtn = document.querySelector('.report-btn');

let dataForXlsx = null;
let nameOfXlsx = 'Данные';

if (downloadBtn) {
  downloadBtn.addEventListener('click', () => {
    if (!dataForXlsx) return;

    try {
      nameOfXlsx = nameOfXlsx.replace(/\s/g, '_');

      const workbook = XLSX.utils.book_new();
      const sheet = XLSX.utils.aoa_to_sheet(dataForXlsx);
      XLSX.utils.book_append_sheet(workbook, sheet, nameOfXlsx);


      XLSX.writeFile(workbook, `${nameOfXlsx}_statbook_report.xlsx`);
    } catch (error) {
      alert('Что-то пошло не так, попробуйте выгрузить отчет позже');
    }
  });
}

export function setDataToXlsx(data, title, productCharts) {
  dataForXlsx = data;
  nameOfXlsx = title;

  if (productCharts) {
    productChart = productCharts;
  }
}
