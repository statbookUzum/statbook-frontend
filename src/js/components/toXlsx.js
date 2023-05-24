import { utils, writeFile } from "xlsx";

const downloadBtn = document.querySelector('.report-btn');

let dataForXlsx = null;
let nameOfXlsx = 'Данные';

if (downloadBtn) {
  downloadBtn.addEventListener('click', () => {
    if (!dataForXlsx) return;

    try {
      nameOfXlsx = nameOfXlsx.replace(/\s/g, '_');

      const workbook = utils.book_new();
      const sheet = utils.aoa_to_sheet(dataForXlsx);
      utils.book_append_sheet(workbook, sheet, nameOfXlsx);


      writeFile(workbook, `${nameOfXlsx}_statbook_report.xlsx`);
    } catch (error) {
      alert('Что-то пошло не так, попробуйте выгрузить отчет позже');
    }
  });
}

export function setDataToXlsx(data, title) {
  dataForXlsx = data;
  nameOfXlsx = title;
}
