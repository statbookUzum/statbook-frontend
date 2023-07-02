import {
  getProductCardDataSku,
  getSkuChartsData,
} from "./getCurrentSkuProduct";
import { transformChartsData } from "./transformChartsData";
import { renderProductCard, renderTotalStat } from "../render-products";
import { saleCht, priceCht, lostCht } from "./createCharts";
import { getXlsxData } from "../toXlsx";

let dataForSku;
let skuStrList = [];
let objSkuNumber;

const filterSku = document.querySelector(".filter-sku");

if (filterSku) {
  filterSku.addEventListener("click", ({ target }) => {
    const item = target.closest(".filter-sku__item");
    if (item) {
      const label = item.closest(".filter-sku__label");
      const section = item.closest(".filter-sku__section");
      const sectionType = section.dataset.value;
      const value = label.querySelector(".filter-sku__input").value.trim();
      const skuTitle = section.querySelector(".filter-sku__section-value");

      skuTitle.textContent = value;

      skuStrList.forEach((item) => {
        if (item.name === sectionType) {
          item.value = value;
        }
      });

      const skuStr = concatSkuStr();
      const skuNumber = findSkuNumber(objSkuNumber, skuStr);

      if (skuNumber) {
        const skuNumberElement = document.querySelector(
          ".filter-sku__top-value"
        );
        skuNumberElement.textContent = skuNumber;

        const inputHiddenForId = document.querySelector(
          ".custom-input__hidden-id"
        );
        const productCard = document.querySelector("[data-product-card]");
        const statList = document.querySelectorAll(".analytics-charts-amount");
        const productCardData = getProductCardDataSku(
          dataForSku.analyze,
          skuNumber
        );
        const skuChartsData = getSkuChartsData(
          dataForSku.chartsInfo,
          skuNumber
        );
        const chartsData = transformChartsData(skuChartsData);
        const cardInfo = {
          ...productCardData,
          title: inputHiddenForId.getAttribute("data-hidden-title"),
        };
        const period = document.querySelector("[data-period-select]").value;

        for (let key in chartsData) {
          if (key === "dateArr") continue;

          chartsData[key] = chartsData[key].map((item) => +item);
        }

        console.log(cardInfo, chartsData);
        const dataForXlsx = getXlsxData();
        dataForXlsx.firstSheet = [
          [`Название продукта, SKU ${skuNumber}`, cardInfo.title.trim()],
          ["Цена продукта", cardInfo.remaining_products_value],
          ["Средняя цена продаж", cardInfo.avg_purchase_price],
          ["Продавец", cardInfo.seller_title],
          ["Остаток (в наличии)", cardInfo.remaining_products],
          ["Продажи", cardInfo.selled_amount],
          ["Выручка", cardInfo.revenue],
          ["Рейтинг", cardInfo.rating],
          [""],
          [`Продажи за последние ${period} дней`],
          chartsData.dateArr,
          chartsData.saleArr,
          [""],
          [`Изменение цены за последние ${period} дней`],
          chartsData.dateArr,
          chartsData.priceArr,
          [""],
          [`Кол-во остатков за последние ${period} дней`],
          chartsData.dateArr,
          chartsData.lostArr,
        ];

        renderProductCard(cardInfo, productCard, dataForSku.positions);
        renderTotalStat(cardInfo, statList);

        saleCht.data.datasets[0].data = chartsData.saleArr;
        saleCht.data.labels = chartsData.dateArr;
        saleCht.update();

        priceCht.data.datasets[0].data = chartsData.priceArr;
        priceCht.data.labels = chartsData.dateArr;
        priceCht.update();

        lostCht.data.datasets[0].data = chartsData.lostArr;
        lostCht.data.labels = chartsData.dateArr;
        lostCht.update();
      }
    }
  });
}

function concatSkuStr() {
  let str = "";
  skuStrList.forEach((item) => {
    if (!item.value) return;

    str += `${item.name}: ${item.value};`;
  });
  str = str.slice(0, -1);
  return str;
}

function findSkuNumber(objSku, str) {
  for (let sku in objSku) {
    if (objSku[sku] === str) return sku;
  }
}

export function getSkuNumber(objSku) {
  objSkuNumber = objSku;
}

export function changeSkuData(data) {
  dataForSku = data;
}

export function setSkuStr(arr) {
  skuStrList = [];
  arr.forEach((item) => {
    skuStrList.push({ name: item.name });
  });
}
