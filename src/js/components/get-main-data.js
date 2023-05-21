import { getDataWithId } from "./https-request";
import { saleCht, priceCht, lostCht } from "./helperCharts/createCharts";
import { renderTable, renderTotalStat, renderBreadcrumbs as renderTableBreadcrumbs, renderSellerCard } from "./render-table";
import { renderProductCard, renderTotalStat as renderProductTotalStat, renderCategory } from "./render-products";
import { transformChartsData } from "./helperCharts/transformChartsData";
import { transformDataForTable } from "./helperTablePage/_transformDataForTables";
import { transformTotalStatData } from "./helperTablePage/_transformTotalStatData";
import { checkDescLine } from "./helperTablePage/_checkAmountLineOfShopDesc";
import { setLoadingAnimation } from "./setLoadingAnimation";
import { setCashingLostViewCard } from "./cashing/cashingLostViewCard";
import { createLastShopCards } from "./slider";
import { setHeight, blurElementAndChildren, changePeriods } from './helper';
import { updateCashingIdMainData } from "./cashing/cashingMainData";
import { setDataToXlsx } from "./toXlsx";
import { setTableData } from "./sortTable";

const sectionsContainer = document.querySelector('.custom-tabs__content');
const productCard = document.querySelector('[data-product-card]');
const statList = document.querySelectorAll('.analytics-charts-amount');
const analyticsList = document.querySelector('.category-analytics__list');
const productInfo = document.querySelector('.product-info');
const mainSectionInner = document.querySelector('.main-section__inner');

// tables variables
const tableList = document.querySelectorAll('.table');
// total stat
const totalStatList = document.querySelectorAll('[data-total]');
// card info
const sellerCard = document.querySelectorAll('[data-seller-card');

// временно
const categoryNameList = document.querySelectorAll('[data-title]')

const breadcrumbsList = document.querySelectorAll('[data-breadcrumbs]');

export function getMainData(searchForm, pageType, categoryCardData, period) {
  const inputHiddenForId = searchForm.querySelector('.custom-input__hidden-id');
  const id = inputHiddenForId.value;
  const label = searchForm.querySelector('.auth-form__label');
  const button = searchForm.querySelector('button[type=submit]');

  button.disabled = true;
  blurElementAndChildren(label);

  setLoadingAnimation(mainSectionInner, true);
  tableList.forEach(table => table.innerHTML = '');
  setTimeout(setHeight, 0);

  let startTime;
  let endTime;

  if (pageType === 'shop') {
    getDataWithId(id, pageType, period)
      .then(response => {
        return {
          table: transformDataForTable(response.data, pageType),
          totalStat: transformTotalStatData(response.data.analyze, 'shop'),
          cardInfo: response.data.card_info[0],
        }
      })
      .then(transformData => {

        setTableData(transformData.table);
        renderTable(transformData.table, tableList);
        renderTotalStat(transformData.totalStat, totalStatList);
        renderSellerCard(transformData.cardInfo, sellerCard);

        setDataToXlsx(transformData.table.review, transformData.cardInfo.title);
        updateCashingIdMainData(pageType, transformData.cardInfo, transformData.totalStat);

        setLoadingAnimation(mainSectionInner, false);
        button.disabled = false;

        checkDescLine();
        setCashingLostViewCard(transformData.cardInfo, pageType);
        createLastShopCards();
      })
      .catch(error => {
        setDataToXlsx(null);
        console.log(error);
      });
  }

  if (pageType === 'category') {

    getDataWithId(id, pageType, period)
      .then(response => {
        return {
          totalStat: transformTotalStatData(response.data.analyze, 'category'),
          table: transformDataForTable(response.data, 'category'),
        }
      })
      .then(transformData => {
        setTableData(transformData.table);

        categoryNameList.forEach(categoryName => {
          categoryName.textContent = categoryCardData.categoryName;
        });

        renderTableBreadcrumbs(categoryCardData.breadcrumbs, breadcrumbsList);
        renderTable(transformData.table, tableList);
        renderTotalStat(transformData.totalStat, totalStatList);

        setDataToXlsx(transformData.table.review, categoryCardData.categoryName);
        updateCashingIdMainData(pageType, { title: categoryCardData.categoryName }, transformData.totalStat, categoryCardData.breadcrumbs);

        setLoadingAnimation(mainSectionInner, false);
        button.disabled = false;
      })
      .catch(error => {
        console.log(error);
      });
  }

  if (pageType === 'product') {
    setLoadingAnimation(mainSectionInner, true);
    setLoadingAnimation(productInfo, true);
    getDataWithId(id, pageType, period)
      .then(response => {
        console.log(response.data);
        document.querySelector('.analytics-charts').style.display = 'block';

        return {
          chartsData: transformChartsData(response.data.chartsInfo),
          totalStat: response.data.analyze[0],
          cardInfo: { ...response.data.analyze[0], title: inputHiddenForId.getAttribute('data-hidden-title') },
          positions: response.data.positions,
        }
      })
      .then(transformData => {
        renderProductCard(transformData.cardInfo, productCard);
        renderProductTotalStat(transformData.totalStat, statList);

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

        setTimeout(setHeight, 100);
        setLoadingAnimation(mainSectionInner, false);
        setLoadingAnimation(productInfo, false);
        updateCashingIdMainData(pageType, transformData.cardInfo);

        setCashingLostViewCard(transformData.cardInfo, pageType);
        createLastShopCards();
        button.disabled = false;
      })
      .catch(error => {
        console.log(error);
      })
  }
}
