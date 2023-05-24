import { tableList } from "./vars";
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
import { setError } from "./setError";

const mainSectionInner = document.querySelector('.main-section__inner');

export function getMainData(searchForm, pageType, categoryCardData, period) {
  const inputHiddenForId = searchForm.querySelector('.custom-input__hidden-id');
  const id = inputHiddenForId.value;
  const label = searchForm.querySelector('.auth-form__label');
  const button = searchForm.querySelector('button[type=submit]');

  button.disabled = true;
  blurElementAndChildren(label);

  setLoadingAnimation(mainSectionInner, true);
  setError(mainSectionInner, false);
  tableList.forEach(table => table.innerHTML = '');
  setTimeout(setHeight, 0);

  try {
    if (pageType === 'shop') {
      const totalStat = document.querySelector('[data-total]');
      const sellerCard = document.querySelectorAll('[data-seller-card');

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
          renderTotalStat(transformData.totalStat, totalStat);
          renderSellerCard(transformData.cardInfo, sellerCard);

          const arrToXlsx = [
            [`Анализ магазинов за ${period} дней`],
            ...transformData.table.analyze,
            [`Обзор магазинов за ${period} дней`],
            ...transformData.table.review,
          ]

          setDataToXlsx(arrToXlsx, transformData.cardInfo.title);
          updateCashingIdMainData(pageType, transformData.cardInfo, transformData.totalStat);

          setLoadingAnimation(mainSectionInner, false);
          button.disabled = false;

          checkDescLine();
          setCashingLostViewCard(transformData.cardInfo, pageType);
          createLastShopCards();
        })
        .catch(error => {
          setDataToXlsx(null);
          setError(mainSectionInner, true);
          button.disabled = false;
          console.log(error);
        });
    }

    if (pageType === 'category') {
      const totalStat = document.querySelector('[data-total]');
      const categoryName = document.querySelector('[data-title]');
      const breadcrumbsEl = document.querySelector('[data-breadcrumbs]');

      getDataWithId(id, pageType, period)
        .then(response => {
          console.log(response.data);
          return {
            totalStat: transformTotalStatData(response.data.analyze, 'category'),
            table: transformDataForTable(response.data, 'category'),
          }
        })
        .then(transformData => {
          setTableData(transformData.table);


          categoryName.textContent = categoryCardData.categoryName;

          renderTableBreadcrumbs(categoryCardData.breadcrumbs, breadcrumbsEl);
          renderTable(transformData.table, tableList);
          renderTotalStat(transformData.totalStat, totalStat);

          const arrToXlsx = [
            [`Категории за ${period} дней`],
            ...transformData.table.analyze,
            [`Обзор категорий за ${period} дней`],
            ...transformData.table.review,
          ];

          setDataToXlsx(arrToXlsx, categoryCardData.categoryName);
          updateCashingIdMainData(pageType, { title: categoryCardData.categoryName, category_id: id }, transformData.totalStat, categoryCardData.breadcrumbs);

          setLoadingAnimation(mainSectionInner, false);
          button.disabled = false;
        })
        .catch(error => {
          setDataToXlsx(null);
          setError(mainSectionInner, true);
          button.disabled = false;
          console.log(error);
        });
    }

    if (pageType === 'product') {
      const productCard = document.querySelector('[data-product-card]');
      const statList = document.querySelectorAll('.analytics-charts-amount');
      const analyticsList = document.querySelector('.category-analytics__list');
      const productInfo = document.querySelector('.product-info');

      setLoadingAnimation(mainSectionInner, true);
      setLoadingAnimation(productInfo, true);
      getDataWithId(id, pageType, period)
        .then(response => {
          console.log(response.data);
          document.querySelector('.analytics-charts').style.display = 'block';

          return {
            chartsData: transformChartsData(response.data.chartsInfo),
            cardInfo: { ...response.data.analyze[0], title: inputHiddenForId.getAttribute('data-hidden-title') },
            positions: response.data.positions,
          }
        })
        .then(transformData => {
          renderProductCard(transformData.cardInfo, productCard, transformData.positions);
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

          const arrToXlsx = [
            ['Название продукта', transformData.cardInfo.title],
            ['Цена продукта', transformData.cardInfo.remaining_products_value],
            ['Средняя цена продаж', transformData.cardInfo.avg_purchase_price],
            ['Продавец', transformData.cardInfo.seller_title],
            ['Остаток (в наличии)', transformData.cardInfo.remaining_products],
            ['Продажи', transformData.cardInfo.selled_amount],
            ['Выручка', transformData.cardInfo.revenue],
            ['Рейтинг', transformData.cardInfo.rating],
            [''],
            [`Продажи за последние ${period} дней`],
            transformData.chartsData.dateArr,
            transformData.chartsData.saleArr,
            [''],
            [`Изменение цены за последние ${period} дней`],
            transformData.chartsData.dateArr,
            transformData.chartsData.priceArr,
            [''],
            [`Кол-во остатков за последние ${period} дней`],
            transformData.chartsData.dateArr,
            transformData.chartsData.lostArr,
          ]


          setDataToXlsx(arrToXlsx, transformData.cardInfo.seller_title);
          setTimeout(setHeight, 100);
          setLoadingAnimation(mainSectionInner, false);
          setLoadingAnimation(productInfo, false);
          updateCashingIdMainData(pageType, transformData.cardInfo, null, transformData.positions);

          setCashingLostViewCard(transformData.cardInfo, pageType);
          createLastShopCards();
          button.disabled = false;
        })
        .catch(error => {
          setDataToXlsx(null);
          setError(productInfo, true);
          button.disabled = false;
          console.log(error);
        })
    }
  } catch (error) {
    console.log(error);
    setLoadingAnimation(mainSectionInner, false);
    alert('Кажется что-то пошло не так, попробуйте позже')
  }
}
