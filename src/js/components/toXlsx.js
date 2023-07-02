import { utils, writeFile } from "xlsx-js-style";

const downloadBtn = document.querySelector(".report-btn");

let dataForXlsx = null;
let nameOfXlsx = "Данные";
let isProductPage = false;

if (downloadBtn) {
  downloadBtn.addEventListener("click", () => {
    if (!dataForXlsx) return;

    try {
      const { firstSheet, secondSheet } = dataForXlsx;

      nameOfXlsx = nameOfXlsx.replace(/\s/g, "_");
      nameOfXlsx = nameOfXlsx.slice(0, 10);

      const workbook = utils.book_new();
      if (secondSheet) {
        if (!isProductPage) {
          stringToNumberAndRemoveImg(secondSheet);
        }
        const rulesArr = !isProductPage
          ? setFormatDataArr(secondSheet[1])
          : null;
        const sheet = utils.aoa_to_sheet(secondSheet);
        const wscols = setWidthCols(secondSheet);
        sheet["!cols"] = wscols;
        if (!isProductPage) {
          getStyleToTable(sheet, "", rulesArr);
        } else {
          getStyleToProductTable(sheet);
        }

        const nameOfPage = isProductPage ? "Total_" : "Review_";

        utils.book_append_sheet(workbook, sheet, nameOfPage + nameOfXlsx);
      }

      if (firstSheet) {
        if (!isProductPage) {
          stringToNumberAndRemoveImg(firstSheet, "analyze");
        }
        const rulesArr = !isProductPage
          ? setFormatDataArr(firstSheet[1])
          : null;
        const sheet = utils.aoa_to_sheet(firstSheet);
        const wscols = setWidthCols(firstSheet);
        sheet["!cols"] = wscols;
        if (!isProductPage) {
          getStyleToTable(sheet, "analyze", rulesArr);
        } else {
          getStyleToProductTable(sheet);
        }
        utils.book_append_sheet(workbook, sheet, "Analyze_" + nameOfXlsx);
      }

      writeFile(workbook, `${nameOfXlsx}_statbook_report.xlsx`);
    } catch (error) {
      console.log(error);
      alert("Что-то пошло не так, попробуйте выгрузить отчет позже");
    }
  });
}

function setFormatDataArr(arr) {
  const cols = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const rulesArr = [
    "теĸущая цена, uzs",
    "выручка, uzs",
    "базовая выручка, uzs",
    "средняя цена, uzs",
    "ср. базовая цена,. uzs",
    "стоимость остатков, uzs",
    "прогнозируемая выручĸа, uzs",
    "упущенная выручĸа, uzs",
    "средний доход, uzs",
    "средний чеĸ",
    "стоимость остатĸов (по теĸ. цене), uzs",
  ];
  const resultArr = [];

  arr.forEach((item, i) => {
    if (rulesArr.includes(item.toLowerCase())) {
      resultArr.push(cols[i]);
    }
  });

  return resultArr;
}

function getStyleToProductTable(sheet) {
  for (let cell in sheet) {
    if (cell[0] === "!") continue;

    const cellNum = parseInt(cell.match(/\d+/));

    sheet[cell].s = {
      font: {
        sz: 12,
        color: { rgb: "040f23" },
      },
      numFmt: "0",
    };

    if (cell === "A1" || cell === "B1") {
      sheet[cell].s.fill = { fgColor: { rgb: "F9CB9C" } };
      sheet[cell].s.alignment = { vertical: "center" };
      continue;
    }

    if (cellNum === 12 || cellNum === 16 || cellNum === 20) {
      sheet[cell].s.alignment = { horizontal: "center" };
    }

    if (cellNum === 16 || cell === "B7" || cell === "B3" || cell === "B2") {
      sheet[cell].s.numFmt = "#,##0.00";
    }

    if (cellNum === 11 || cellNum === 15 || cellNum === 19) {
      sheet[cell].s.alignment = { horizontal: "center" };
      sheet[cell].s.font.bold = true;
    }

    if (cellNum === 11) {
      sheet[cell].s.fill = { fgColor: { rgb: "bdcaff" } };
    }

    if (cellNum === 15) {
      sheet[cell].s.fill = { fgColor: { rgb: "98d7cc" } };
    }

    if (cellNum === 19) {
      sheet[cell].s.fill = { fgColor: { rgb: "ffbc7f" } };
    }
  }
}

function getStyleToTable(sheet, typeOfTable, rulesArr = []) {
  for (let cell in sheet) {
    if (cell[0] === "!") continue;

    if (cell === "A1" || cell === "B1") {
      sheet[cell].s = {
        font: {
          sz: 14,
          bold: false,
          color: { rgb: "040f23" },
        },
        fill: { fgColor: { rgb: "F9CB9C" } },
      };

      continue;
    }

    if (cell.length === 2 && cell[1] == "2") {
      sheet[cell].s = {
        font: {
          name: "Calibri",
          sz: 12,
          bold: true,
          color: { rgb: "040f23" },
        },
        fill: { fgColor: { rgb: "b6cef7" } },
      };

      continue;
    }

    if (cell[0] === "A" && typeOfTable !== "analyze") {
      sheet[cell].s = {
        font: {
          name: "Calibri",
          sz: 12,
          bold: false,
          color: { rgb: "040f23" },
        },
      };

      continue;
    }

    sheet[cell].s = {
      font: {
        sz: 12,
        bold: false,
        color: { rgb: "040f23" },
      },
      alignment: { horizontal: "center" },
      numFmt: "0",
    };

    if (rulesArr.includes(cell[0])) {
      sheet[cell].s.numFmt = "#,##0.00";
    }
  }
}

function setWidthCols(arr) {
  const wscols = [];

  arr.forEach((item, i) => {
    if (i === 0) {
      wscols.push({ wch: 32 });
    } else {
      wscols.push({ wch: 18 });
    }
  });

  return wscols;
}

function stringToNumberAndRemoveImg(arr, typeOfTable) {
  const exceptIndex = [];

  arr.forEach((item, i) => {
    if (typeOfTable !== "analyze") item.shift();

    if (i === 1) {
      item.forEach((childItem, j) => {
        if (
          childItem.toLowerCase() === "название товара" ||
          childItem.toLowerCase() === "id товара" ||
          childItem.toLowerCase() === "sku" ||
          childItem.toLowerCase() === "доля упущенной выручĸи, %" ||
          childItem.toLowerCase() === "yo`qotilgan daromadning ulushi, %" ||
          childItem.toLowerCase() === "продавец" ||
          childItem.toLowerCase() === "sotuvchi" ||
          childItem.toLowerCase() === "ссылка на товар" ||
          childItem.toLowerCase() === "havola" ||
          childItem.toLowerCase() === "название категории(рус)" ||
          childItem.toLowerCase() === "toifa nomi (rus)" ||
          childItem.toLowerCase() === "название категории(узб)" ||
          childItem.toLowerCase() === "toifa nomi (uzb)" ||
          childItem.toLowerCase() === "mahsulot nomi" ||
          childItem.toLowerCase() === "characteristics"
        ) {
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
  isProductPage = pageType === "product" ? true : false;
}

export function getXlsxData() {
  return dataForXlsx;
}
