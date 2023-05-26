import { utils, writeFile } from "xlsx";

const downloadBtn = document.querySelector('.report-btn');

let dataForXlsx = null;
let nameOfXlsx = 'Данные';
let isProductPage = false;

if (downloadBtn) {
  downloadBtn.addEventListener('click', () => {
    if (!dataForXlsx) return;

    try {
      const { firstSheet, secondSheet } = dataForXlsx;

      nameOfXlsx = nameOfXlsx.replace(/\s/g, '_');
      nameOfXlsx = nameOfXlsx.slice(0, 10);

      const workbook = utils.book_new();
      if (firstSheet) {
        if (!isProductPage) {
          stringToNumber(firstSheet);
        }
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
        if (childItem.toLowerCase() === 'изображение' || childItem.toLowerCase() === 'название товара' || childItem.toLowerCase() === 'id товара' || childItem.toLowerCase() === 'sku' || childItem.toLowerCase() === 'доля упущенной выручĸи, %' || childItem.toLowerCase() === 'продавец' || childItem.toLowerCase() === 'ссылка на товар' || childItem.toLowerCase() === 'название категории(рус)' || childItem.toLowerCase() === 'название категории(узб)') {
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
}

export function setDataToXlsx(data, title, pageType) {
  dataForXlsx = data;
  nameOfXlsx = title;
  isProductPage = pageType === 'product' ? true : false;
}
