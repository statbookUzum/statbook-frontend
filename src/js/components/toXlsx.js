import { utils, writeFile } from "xlsx";

const downloadBtn = document.querySelector('.report-btn');

let dataForXlsx = null;
let nameOfXlsx = 'Данные';

if (downloadBtn) {
  downloadBtn.addEventListener('click', () => {
    if (!dataForXlsx) return;

    try {
      const { firstSheet, secondSheet } = dataForXlsx;

      nameOfXlsx = nameOfXlsx.replace(/\s/g, '_');


      const workbook = utils.book_new();
      if (firstSheet) {
        stringToNumber(firstSheet);
        const sheet = utils.aoa_to_sheet(firstSheet);
        utils.book_append_sheet(workbook, sheet, 'Analyze_' + nameOfXlsx);
      }

      if (secondSheet) {
        stringToNumber(secondSheet);
        const sheet = utils.aoa_to_sheet(secondSheet);
        utils.book_append_sheet(workbook, sheet, 'Review_' + nameOfXlsx);
      }


      writeFile(workbook, `${nameOfXlsx}_statbook_report.xlsx`);
    } catch (error) {
      console.log(error);
      alert('Что-то пошло не так, попробуйте выгрузить отчет позже');
    }
  });
}

function stringToNumber(arr) {
  const exceptIndex = [];

  arr.forEach((item, i) => {
    if (i === 1) {
      item.forEach((childItem, j) => {
        console.log(childItem.toLowerCase());
        if (childItem.toLowerCase() === 'изображение' || childItem.toLowerCase() === 'название товара' || childItem.toLowerCase() === 'id товара' || childItem.toLowerCase() === 'sku' || childItem.toLowerCase() === 'доля упущенной выручĸи, %') {
          exceptIndex.push(j);
        }
      });
    }

    if (i > 1) {
      item.forEach((childItem, j) => {
        if (!exceptIndex.includes(j)) {
          item[j] = +childItem;
        }
      });
    }
  });

  console.log(exceptIndex);
  console.log(arr);
}

export function setDataToXlsx(data, title) {
  dataForXlsx = data;
  nameOfXlsx = title;
}
