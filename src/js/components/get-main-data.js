import { tableList } from "./vars";
import { getDataWithId } from "./https-request";
import { saleCht, priceCht, lostCht } from "./helperCharts/createCharts";
import {
  renderTable,
  renderTotalStat,
  renderBreadcrumbs as renderTableBreadcrumbs,
  renderSellerCard,
} from "./render-table";
import {
  renderProductCard,
  renderTotalStat as renderProductTotalStat,
  renderCategory,
} from "./render-products";
import { transformChartsData } from "./helperCharts/transformChartsData";
import { transformDataForTable } from "./helperTablePage/transformDataForTables";
import { transformTotalStatData } from "./helperTablePage/transformTotalStatData";
import { checkDescLine } from "./helperTablePage/checkAmountLineOfShopDesc";
import { setLoadingAnimation } from "./setLoadingAnimation";
import { setCashingLostViewCard } from "./cashing/cashingLostViewCard";
import { createLastShopCards } from "./slider";
import {
  setHeight,
  blurElementAndChildren,
  changePeriods,
  getProductSkuFromString,
} from "./helper";
import { updateCashingIdMainData } from "./cashing/cashingMainData";
import { setDataToXlsx, setXlsxProductArr } from "./toXlsx";
import { setTableData } from "./sortTable";
import { setError } from "./setError";
import { changeLang } from "./change-lang";
import {
  totalProductCardInfo,
  totalChartsData,
} from "./helperCharts/sumSkuProduct";
import {
  getProductCardDataSku,
  getSkuChartsData,
} from "./helperCharts/getCurrentSkuProduct";
import { renderSkuFilter } from "./helperCharts/filterSku";
import { changeSkuData } from "./helperCharts/changeSku";
import { tableHeaderTooltip } from "./helperTablePage/tableHeaderTooltip";

const mainSectionInner = document.querySelector(".main-section__inner");
const mainSectionWrapper = document.querySelector(".main-section__wrapper");
let requestStatus = false;

export function getMainData(searchForm, pageType, categoryCardData, period) {
  const inputHiddenForId = searchForm.querySelector(".custom-input__hidden-id");
  const searchInput = searchForm.querySelector(".custom-input__input");
  const id = inputHiddenForId.value;
  const label = searchForm.querySelector(".auth-form__label");
  const button = searchForm.querySelector("button[type=submit]");
  const uploadButton = document.querySelector(".upload-btn");

  if (uploadButton) uploadButton.remove();

  if (requestStatus) return;

  if (inputHiddenForId.getAttribute("data-hidden-title")) {
    searchInput.value = inputHiddenForId.getAttribute("data-hidden-title");
  }

  requestStatus = true;
  button.disabled = true;
  blurElementAndChildren(label);

  setLoadingAnimation(mainSectionInner, true);
  setError(mainSectionInner, false);
  tableList.forEach((table) => (table.innerHTML = ""));
  setTimeout(setHeight, 0);
  mainSectionWrapper.scrollIntoView({ block: "start", behavior: "auto" });

  try {
    if (pageType === "shop") {
      const totalStat = document.querySelector("[data-total]");
      const sellerCard = document.querySelectorAll("[data-seller-card");

      getDataWithId(id, pageType, period)
        .then((response) => {
          console.log(response.data);
          return {
            table: transformDataForTable(response.data, pageType),
            totalStat: transformTotalStatData(
              response.data.analyze,
              "shop",
              response.data.numOfSellers[0]
            ),
            cardInfo: response.data.card_info[0],
          };
        })
        .then((transformData) => {
          setTableData(transformData.table);
          renderTable(transformData.table, tableList);
          tableHeaderTooltip();
          renderTotalStat(transformData.totalStat, totalStat);
          renderSellerCard(transformData.cardInfo, sellerCard);

          const arrToXlsx = [
            {
              review: [
                ["", `Обзор магазинов за ${period} дней`],
                ...transformData.table.review,
              ],
            },
            {
              analyze: [
                [`Анализ магазинов за ${period} дней`],
                ...transformData.table.analyze,
              ],
            },
          ];

          setDataToXlsx(arrToXlsx, transformData.cardInfo.title);
          updateCashingIdMainData(
            pageType,
            transformData.cardInfo,
            transformData.totalStat
          );

          setLoadingAnimation(mainSectionInner, false);
          button.disabled = false;

          checkDescLine();
          setCashingLostViewCard(transformData.cardInfo, pageType);
          createLastShopCards();
          requestStatus = false;
        })
        .catch((error) => {
          setDataToXlsx(null);
          setError(mainSectionInner, true);
          button.disabled = false;
          requestStatus = false;
          console.log(error);
        });
    }

    if (pageType === "category") {
      const totalStat = document.querySelector("[data-total]");
      const categoryName = document.querySelector("[data-title]");
      const breadcrumbsEl = document.querySelector("[data-breadcrumbs]");
      getDataWithId(id, pageType, period)
        .then((response) => {
          console.log(response.data);
          return {
            totalStat: transformTotalStatData(
              response.data.analyze,
              "category",
              response.data.numOfSellers[0]
            ),
            table: transformDataForTable(response.data, "category"),
          };
        })
        .then((transformData) => {
          setTableData(transformData.table);

          categoryName.textContent = categoryCardData.categoryName;

          renderTableBreadcrumbs(categoryCardData.breadcrumbs, breadcrumbsEl);
          renderTable(transformData.table, tableList);
          tableHeaderTooltip();
          renderTotalStat(transformData.totalStat, totalStat);

          const arrToXlsx = [
            {
              analyze: [
                [`Категории за ${period} дней`],
                ...transformData.table.analyze,
              ],
            },
            {
              review: [
                ["", `Обзор категорий за ${period} дней`],
                ...transformData.table.review,
              ],
            },
          ];

          setDataToXlsx(arrToXlsx, categoryCardData.categoryName);
          updateCashingIdMainData(
            pageType,
            { title: categoryCardData.categoryName, category_id: id },
            transformData.totalStat,
            categoryCardData.breadcrumbs
          );

          setLoadingAnimation(mainSectionInner, false);
          button.disabled = false;
          requestStatus = false;
        })
        .catch((error) => {
          setDataToXlsx(null);
          setLoadingAnimation(mainSectionInner, false);
          setError(mainSectionInner, true);
          button.disabled = false;
          requestStatus = false;
          console.log(error);
        });
    }

    if (pageType === "product") {
      const productCard = document.querySelector("[data-product-card]");
      const statList = document.querySelectorAll(".analytics-charts-amount");
      const analyticsList = document.querySelector(".category-analytics__list");
      const productInfo = document.querySelector(".product-info");
      const skuFilterContainer = document.querySelector(".filter-sku");

      function segregateProductData(data) {
        const sheetsDataObj = {};

        data.analyze.forEach((item) => {
          sheetsDataObj[item.sku] = {
            analyze: {
              ...item,
              title: inputHiddenForId.getAttribute("data-hidden-title"),
            },
          };

          const chartData = getSkuChartsData(data.chartsInfo, item.sku);

          sheetsDataObj[item.sku].chartsInfo = transformChartsData(chartData);
        });

        const totalChartData = totalChartsData(data.chartsInfo);

        sheetsDataObj["totalData"] = {
          analyze: {
            ...totalProductCardInfo(data.analyze),
            title: inputHiddenForId.getAttribute("data-hidden-title"),
          },
          chartsInfo: transformChartsData(totalChartData),
        };

        return sheetsDataObj;
      }

      setLoadingAnimation(mainSectionInner, true);
      setLoadingAnimation(productInfo, true);
      skuFilterContainer.style.display = "none";
      getDataWithId(id, pageType, period)
        .then((response) => {
          console.log(response.data);
          changeSkuData(response.data);

          const productSku = getProductSkuFromString(searchInput.value);
          const isSku = response.data.analyze.find(
            (item) => item.sku === productSku
          );

          isSku
            ? renderSkuTop(productSku, skuFilterContainer)
            : renderSkuTop(
                changeLang("cтатистика по всем SKU"),
                skuFilterContainer
              );
          renderSkuFilter(response.data, searchInput, skuFilterContainer);

          function renderSkuTop(msg, skuContainer) {
            const oldSkuTop = skuContainer.querySelector(".filter-sku__top");
            if (oldSkuTop) oldSkuTop.remove();

            const skuTop = document.createElement("div");
            skuTop.classList.add("filter-sku__top");
            skuTop.innerHTML = `
            <div class="filter-sku__top-item">
                SKU: <span class="filter-sku__top-value">${msg}</span>
              </div>
            `;

            skuContainer.prepend(skuTop);
          }

          const segregateData = segregateProductData(response.data);
          document.querySelector(".analytics-charts").style.display = "block";

          return {
            cardInfo: !isSku
              ? segregateData.totalData.analyze
              : segregateData[productSku].analyze,
            chartsData: !isSku
              ? segregateData.totalData.chartsInfo
              : segregateData[productSku].chartsInfo,
            positions: response.data.positions,
            sheetsData: segregateData,
          };
        })
        .then((transformData) => {
          renderProductCard(
            transformData.cardInfo,
            productCard,
            transformData.positions
          );
          renderProductTotalStat(transformData.cardInfo, statList);

          saleCht.data.datasets[0].data = transformData.chartsData.saleArr;
          saleCht.data.labels = transformData.chartsData.dateArr;
          saleCht.update();

          priceCht.data.datasets[0].data = transformData.chartsData.priceArr;
          priceCht.data.labels = transformData.chartsData.dateArr;
          priceCht.update();

          lostCht.data.datasets[0].data = transformData.chartsData.lostArr;
          lostCht.data.labels = transformData.chartsData.dateArr;
          lostCht.update();

          changePeriods(period);
          renderCategory(transformData.positions, analyticsList);

          const arrToXlsx = setXlsxProductArr(transformData.sheetsData, period);

          setDataToXlsx(
            arrToXlsx,
            transformData.cardInfo.seller_title,
            "product"
          );

          setTimeout(setHeight, 100);
          setLoadingAnimation(mainSectionInner, false);
          setLoadingAnimation(productInfo, false);
          skuFilterContainer.style.display = "block";
          updateCashingIdMainData(
            pageType,
            transformData.cardInfo,
            null,
            transformData.positions
          );

          setCashingLostViewCard(transformData.cardInfo, pageType);
          createLastShopCards();
          button.disabled = false;
          requestStatus = false;
        })
        .catch((error) => {
          setDataToXlsx(null);
          setError(productInfo, true);
          button.disabled = false;
          requestStatus = false;
          console.log(error);
        });
    }
  } catch (error) {
    console.log(error);
    setLoadingAnimation(mainSectionInner, false);
    alert(changeLang("Кажется что-то пошло не так, попробуйте позже"));
  }
}
