import { getHelperData, getDataWithId } from "./https-request";
import { showHelperList } from "./search-form/show-helper-list";
import { renderCategoryList, renderShopList, renderProductList } from "./search-form/renderHelperList";
import { transformCategoryData, transformShopData, transformProductData } from "./search-form/transformSearchData";
import { renderBreadcrumbs } from "./search-form/renderBreadcrumbs";
import { setLoadingAnimation } from "./setLoadingAnimation";
import { renderTable, renderTotalStat, renderBreadcrumbs as renderTableBreadcrumbs, renderSellerCard } from "./render-table";
import { renderProductCard, renderTotalStat as renderProductTotalStat, renderCategory } from "./render-products";
import { transformChartsData } from "./helperCharts/transformChartsData";
import { transformDataForTable } from "./helperTablePage/_transformDataForTables";
import { transformTotalStatData } from "./helperTablePage/_transformTotalStatData";
import { debounce, setHeight, blurElementAndChildren } from "./helper";
import { Chart } from "chart.js/auto";

const searchForm = document.querySelector('[data-search]');

if (searchForm) {
  const pageType = document.querySelector('.main').getAttribute('data-page-type');
  const searchInput = searchForm.querySelector('.custom-input__input');
  const inputHiddenForId = searchForm.querySelector('.custom-input__hidden-id');
  const helperWrapper = document.querySelector('.search-form__helper-wrapper');
  const sectionsContainer = document.querySelector('.custom-tabs__content');
  const productCard = document.querySelector('[data-product-card]');
  const statList = document.querySelectorAll('.analytics-charts-amount');
  const analyticsList = document.querySelector('.category-analytics__list');


  //----------------------------------------------------------------------
  const saleChart = document.getElementById('saleChart');
  const priceChart = document.getElementById('priceChart');
  const lostChart = document.getElementById('lostChart');

  let labelsData = ['', '', '', '', '', '', '', '', '', '', '', '', '', '',];
  const sortLabels = (value, index, items) => {
    if (index + 1 === 1) {
      return labelsData[index];
    }

    if ((index + 1) % 5 === 0) {
      return labelsData[index];
    }

    if ((index + 1) === items.length) {
      return labelsData[index];
    }

    return '';
  }

  const saleCht = !saleChart ? null : new Chart(saleChart, {
    type: 'bar',
    data: {
      labels: labelsData,
      datasets: [{
        label: 'График продаж',
        data: [],
        borderWidth: 0,
        backgroundColor: 'rgba(124, 150, 255, 0.5)',
        borderRadius: 15,
        hoverBackgroundColor: '#7C96FF',
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            display: false,
          },
          ticks: {
            color: 'rgba(0, 0, 0, 0.25)',
            font: {
              family: 'Open Sans',
              size: 12,
              weight: 600,
            }
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            callback: sortLabels,
            font: {
              family: 'Open Sans',
              size: 12,
              weight: 600,
            },
            color: 'rgba(4, 15, 35, 0.25)',
          }
        },
      },
      maintainAspectRatio: false,
      barPercentage: 0.8,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              var label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              label += context.formattedValue;
              label += ' шт.';
              return label;
            }
          }
        }
      }
    }
  });


  // const labelsData = chartsData.saleChartData.map(item => item.date);
  // const valueData = chartsData.saleChartData.map(item => item.value);

  const priceCht = !priceChart ? null : new Chart(priceChart, {
    type: 'bar',
    data: {
      labels: labelsData,
      datasets: [{
        label: 'График цены',
        data: [],
        borderWidth: 0,
        backgroundColor: 'rgba(50, 175, 153, 0.5)',
        borderRadius: 15,
        hoverBackgroundColor: 'rgba(50, 175, 153, 0.8)',
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            display: false,
          },
          ticks: {
            color: 'rgba(0, 0, 0, 0.25)',
            font: {
              family: 'Open Sans',
              size: 12,
              weight: 600,
            }
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            callback: sortLabels,
            font: {
              family: 'Open Sans',
              size: 12,
              weight: 600,
            },
            color: 'rgba(4, 15, 35, 0.25)',
          }
        },
      },
      maintainAspectRatio: false,
      barPercentage: 0.8,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              var label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              label += context.formattedValue;
              label += ' сум';
              return label;
            }
          }
        }
      }
    }
  });


  // const labelsData = chartsData.saleChartData.map(item => item.date);
  // const valueData = chartsData.saleChartData.map(item => item.value);

  const lostCht = !lostChart ? null : new Chart(lostChart, {
    type: 'bar',
    data: {
      labels: labelsData,
      datasets: [{
        label: 'График остатков',
        data: [],
        borderWidth: 0,
        backgroundColor: 'rgba(255, 122, 0, 0.5)',
        borderRadius: 15,
        hoverBackgroundColor: 'rgba(255, 122, 0, 0.8)',
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            display: false,
          },
          ticks: {
            color: 'rgba(0, 0, 0, 0.25)',
            font: {
              family: 'Open Sans',
              size: 12,
              color: 'rgba(4, 15, 35, 0.25)',
              weight: 600,
            }
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            callback: sortLabels,
            font: {
              family: 'Open Sans',
              size: 12,
              weight: 600,
            },
            color: 'rgba(4, 15, 35, 0.25)',
          }
        },
      },
      maintainAspectRatio: false,
      barPercentage: 0.8,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              var label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              label += context.formattedValue;
              label += ' шт';
              return label;
            }
          }
        }
      }
    }
  });

  // tables variables
  const tableList = document.querySelectorAll('.table');
  const tableContainers = document.querySelectorAll('.table-container');

  // total stat
  const totalStatList = document.querySelectorAll('[data-total]');

  // card info
  const sellerCard = document.querySelectorAll('[data-seller-card');

  // data for category card
  const categoryCardData = {};
  const productCardData = {};

  const breadcrumbsList = document.querySelectorAll('[data-breadcrumbs]');

  // временно
  const categoryNameList = document.querySelectorAll('[data-title]')

  let debounceRender = debounce(renderHelperList, 1500);

  searchInput.addEventListener('input', () => {
    debounceRender(searchInput.value);
  });

  function renderHelperList(value) {
    showHelperList(value);

    if (value) {
      setLoadingAnimation(helperWrapper, true);

      if (pageType === 'category') {
        getHelperData(value, pageType)
          .then(response => transformCategoryData(response))
          .then(responseObj => {
            renderBreadcrumbs(responseObj.breadcrumbs[responseObj.helperList[0]?.category_id]);
            renderCategoryList(responseObj.helperList);

            inputHiddenForId.value = responseObj.helperList[0] ? responseObj.helperList[0].category_id : '';

            categoryCardData.categoryName = responseObj.helperList[0]?.title_ru;
            categoryCardData.breadcrumbs = responseObj.breadcrumbs[responseObj.helperList[0]?.category_id]
              ?.map(item => item.title_ru ? item.title_ru : item.title_uz);

            setLoadingAnimation(helperWrapper, false);
          })
          .catch(error => {
            renderCategoryList(null);
            console.log(error);
          });
      }

      if (pageType === 'shop') {
        getHelperData(value, pageType)
          .then(response => transformShopData(response))
          .then(helperList => {
            renderShopList(helperList);

            inputHiddenForId.value = helperList[0] ? helperList[0].seller_id : '';

            setLoadingAnimation(helperWrapper, false);
          })
          .catch(error => {
            console.log(error);
            renderShopList(null);
          });
      }

      if (pageType === 'product') {
        getHelperData(value, pageType)
          .then(response => transformProductData(response))
          .then(helperList => {
            renderProductList(helperList);

            inputHiddenForId.value = helperList[0] ? helperList[0].product_id : '';

            setLoadingAnimation(helperWrapper, false);
          })
          .catch(error => {
            console.log(error);
            renderProductList(null);
          });
      }
    }
  }

  helperWrapper.addEventListener('click', ({ target }) => {
    if (target.matches('.search-form-request')) {
      const text = target.textContent.trim();
      const id = target.getAttribute('data-id');

      if (inputHiddenForId.value === id) {
        searchInput.value = text;

        renderShopList([{ seller_id: id, title: text }]);
        searchInput.focus();
        return;
      }

      setLoadingAnimation(helperWrapper, true);

      searchInput.value = text;

      inputHiddenForId.value = id;

      if (pageType === 'category') {
        getHelperData(text, pageType)
          .then(response => transformCategoryData(response))
          .then(responseObj => {
            categoryCardData.categoryName = text;
            categoryCardData.breadcrumbs = responseObj.breadcrumbs[id]
              .map(item => item.title_ru ? item.title_ru : item.title_uz);

            renderBreadcrumbs(responseObj.breadcrumbs[id]);
            renderCategoryList(responseObj.helperList);
            searchInput.focus();

            setLoadingAnimation(helperWrapper, false);
          })
          .catch(error => {
            console.log(error);
            renderCategoryList(null);
          });
      }

      if (pageType === 'shop') {
        getHelperData(text, pageType)
          .then(response => transformShopData(response))
          .then(helperList => {
            renderShopList(helperList);
            searchInput.focus();

            setLoadingAnimation(helperWrapper, false);
          })
          .catch(error => {
            console.log(error);
            renderShopList(null);
          });
      }

      if (pageType === 'product') {
        productCardData.title = text;

        getHelperData(text, pageType)
          .then(response => transformProductData(response))
          .then(helperList => {
            renderProductList(helperList);

            searchInput.focus();

            setLoadingAnimation(helperWrapper, false);
          })
          .catch(error => {
            console.log(error);
            renderProductList(null);
          });
      }
    }
  });

  // tables and charts
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputHiddenForId = searchForm.querySelector('.custom-input__hidden-id');
    const id = inputHiddenForId.value;
    const label = searchForm.querySelector('.auth-form__label');
    const button = searchForm.querySelector('button[type=submit]');

    button.disabled = true;
    blurElementAndChildren(label);

    setLoadingAnimation(sectionsContainer, true);
    tableList.forEach(table => table.innerHTML = '');
    setTimeout(setHeight, 0);


    if (pageType === 'shop') {
      getDataWithId(id, pageType)
        .then(response => {
          return {
            table: transformDataForTable(response.data),
            totalStat: transformTotalStatData(response.data.analyze, 'shop'),
            cardInfo: response.data.card_info[0],
          }
        })
        .then(transformData => {
          renderTable(transformData.table, tableList);
          renderTotalStat(transformData.totalStat, totalStatList);
          renderSellerCard(transformData.cardInfo, sellerCard);

          setLoadingAnimation(sectionsContainer, false);
          button.disabled = false;
        })
        .catch(error => {
          console.log(error);
        });
    }

    if (pageType === 'category') {

      getDataWithId(id, pageType)
        .then(response => {
          console.log(response.data);
          return {
            table: transformDataForTable(response.data),
            totalStat: transformTotalStatData(response.data.analyze, 'category'),
          }
        })
        .then(transformData => {

          categoryNameList.forEach(categoryName => {
            categoryName.textContent = categoryCardData.categoryName;
          });

          renderTableBreadcrumbs(categoryCardData.breadcrumbs, breadcrumbsList);
          renderTable(transformData.table, tableList);
          renderTotalStat(transformData.totalStat, totalStatList);

          setLoadingAnimation(sectionsContainer, false);
          button.disabled = false;
        })
        .catch(error => {
          console.log(error);
        });
    }

    if (pageType === 'product') {

      getDataWithId(id, pageType)
        .then(response => {
          console.log(response.data);
          document.querySelector('.analytics-charts').style.display = 'block';

          return {
            chartsData: transformChartsData(response.data.chartsInfo),
            totalStat: response.data.analyze[0],
            cardInfo: { ...response.data.analyze[0], ...productCardData },
            positions: response.data.positions,
          }
        })
        .then(transformData => {
          renderProductCard(transformData.cardInfo, productCard);
          renderProductTotalStat(transformData.totalStat, statList);

          labelsData = transformData.chartsData.dateArr;
          saleCht.data.datasets[0].data = transformData.chartsData.saleArr;
          saleCht.update();
          priceCht.data.datasets[0].data = transformData.chartsData.priceArr;
          priceCht.update();
          lostCht.data.datasets[0].data = transformData.chartsData.lostArr;
          lostCht.update();

          setTimeout(setHeight, 100);

          renderCategory(transformData.positions, analyticsList);

          setLoadingAnimation(sectionsContainer, false);
          button.disabled = false;
        })
        .catch(error => {
          console.log(error);
        })
    }
  });
}
