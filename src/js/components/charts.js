import { Chart } from "chart.js/auto";
const chartsSection = document.querySelector('.main-section--charts');

if (chartsSection) {
  const saleChart = document.getElementById('saleChart');
  const priceChart = document.getElementById('priceChart');
  const lostChart = document.getElementById('lostChart');
  const productCard = document.querySelector('[data-product-card]');
  const statList = document.querySelectorAll('.analytics-charts-amount');
  const analyticsList = document.querySelector('.category-analytics__list');

  const chartsData = {
    categoryInfo: {
      title: 'Электроника',
      position: '+13',
      categoryArray: [
        {
          date: '01.04',
          score: 50,
          position: '+48',
        },
        {
          date: '02.04',
          score: 50,
          position: '+48',
        },
        {
          date: '03.04',
          score: 50,
          position: '+48',
        },
        {
          date: '04.04',
          score: 50,
          position: '+48',
        },
        {
          date: '05.04',
          score: 50,
          position: '+48',
        },
      ],
      subcategories: [
        {
          title: 'Умный дом и беопасность',
          position: '-26',
          categoryArray: [
            {
              date: '01.04',
              score: 50,
              position: '-48',
            }
          ]
        },
        {
          title: 'Умный дом и беопасность',
          position: '-26',
          categoryArray: [
            {
              date: '01.04',
              score: 50,
              position: '-48',
            }
          ]
        }
      ]
    },
    productInfo: {
      title: 'Умная лампочка Xiaomi Mi Smart LED Bulb Essential, E27, 9 Вт',
      price: '30.000',
      seller: 'GADGET market',
      description: 'Умный свет, который Вас понимает. Лампочка Xiaomi имеет возможность выбора цвета или регулировки цветовой температуры и яркости...',
      image: '',
    },
    totalStat: {
      sale: 134,
      profit: 50000000,
      average: 3.4,
    },
    saleChartData: [
      {
        date: '01.04',
        value: '30'
      },
      {
        date: '02.04',
        value: '10'
      },
      {
        date: '03.04',
        value: '22'
      },
      {
        date: '04.04',
        value: '24'
      },
      {
        date: '05.04',
        value: '7'
      },
      {
        date: '06.04',
        value: '18'
      },
      {
        date: '07.04',
        value: '28'
      },
      {
        date: '08.04',
        value: '10'
      },
      {
        date: '09.04',
        value: '10'
      },
      {
        date: '10.04',
        value: '15'
      },
      {
        date: '11.04',
        value: '12'
      },
      {
        date: '12.04',
        value: '20'
      },
      {
        date: '13.04',
        value: '29'
      },
      {
        date: '14.04',
        value: '9'
      },
      {
        date: '15.04',
        value: '15'
      },
      {
        date: '16.04',
        value: '18'
      },
      {
        date: '17.04',
        value: '30'
      },
      {
        date: '18.04',
        value: '27'
      },
      {
        date: '19.04',
        value: '22'
      },
      {
        date: '20.04',
        value: '17'
      },
      {
        date: '21.04',
        value: '22'
      },
      {
        date: '22.04',
        value: '24'
      },
      {
        date: '23.04',
        value: '27'
      },
      {
        date: '24.04',
        value: '22'
      },
      {
        date: '25.04',
        value: '17'
      },
      {
        date: '26.04',
        value: '15'
      },
      {
        date: '27.04',
        value: '12'
      },
      {
        date: '28.04',
        value: '16'
      },
      {
        date: '29.04',
        value: '19'
      },
      {
        date: '30.04',
        value: '22'
      },
    ],
    priceChartData: [
      {
        date: '01.04',
        value: '30'
      },
    ],
    lostChartData: [
      {
        date: '01.04',
        value: '30'
      },
    ],
  }

  if (saleChart) {
    const labelsData = chartsData.saleChartData.map(item => item.date);
    const valueData = chartsData.saleChartData.map(item => item.value);

    new Chart(saleChart, {
      type: 'bar',
      data: {
        labels: labelsData,
        datasets: [{
          label: 'График продаж',
          data: valueData,
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
              callback: function (value, index, items) {
                if (index + 1 === 1) {
                  return labelsData[index];
                }

                if ((index + 1) % 5 === 0) {
                  return labelsData[index];
                }

                return '';
              },
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
                label += ' млн';
                return label;
              }
            }
          }
        }
      }
    });
  }

  if (priceChart) {
    const labelsData = chartsData.saleChartData.map(item => item.date);
    const valueData = chartsData.saleChartData.map(item => item.value);

    new Chart(priceChart, {
      type: 'bar',
      data: {
        labels: labelsData,
        datasets: [{
          label: 'График цены',
          data: valueData,
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
              callback: function (value, index, items) {
                if (index + 1 === 1) {
                  return labelsData[index];
                }

                if ((index + 1) % 5 === 0) {
                  return labelsData[index];
                }

                return '';
              },
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
                label += ' млн';
                return label;
              }
            }
          }
        }
      }
    });
  }

  if (lostChart) {
    const labelsData = chartsData.saleChartData.map(item => item.date);
    const valueData = chartsData.saleChartData.map(item => item.value);

    new Chart(lostChart, {
      type: 'bar',
      data: {
        labels: labelsData,
        datasets: [{
          label: 'График остатков',
          data: valueData,
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
              callback: function (value, index, items) {
                if (index + 1 === 1) {
                  return labelsData[index];
                }

                if ((index + 1) % 5 === 0) {
                  return labelsData[index];
                }

                return '';
              },
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
  }

  if (productCard) {
    renderProductCard(chartsData.productInfo, productCard);
  }

  if (statList.length) {
    renderTotalStat(chartsData.totalStat, statList);
  }

  if (analyticsList) {
    renderCategory(chartsData.categoryInfo, analyticsList, true);
  }

  function renderProductCard(data, element) {
    const { title, price, seller, description, image } = data;

    element.innerHTML = `
    <div class="product-info__image">
    <img src="${image ? image : './img/product-test-image.jpg'}"
      alt="${title}">
    </div>
    <div class="product-info__title">
      ${title}
    </div>
    <div class="product-info__price">
      Цена: <span class="product-info__price-amount">${price}</span> <span
        class="product-info__price-currency">сум</span>
    </div>
    <div class="product-info__seller">
      Продавец: <span class="product-info__seller-name">${seller}</span>
    </div>
    <div class="product-info__description">
      ${description}
    </div>
  `;
  }

  function renderTotalStat(data, elements) {

    elements.forEach(element => {
      if (element.matches('[data-total-sale]')) {
        element.textContent = data.sale;
      }

      if (element.matches('[data-total-profit]')) {
        element.textContent = +data.profit / 1000000;
      }

      if (element.matches('[data-total-average]')) {
        element.textContent = data.average;
      }
    });
  }

  function renderCategory(data, element, firstFlag) {
    if (firstFlag) {
      element.innerHTML = '';
    }
    const positionStyle = data.position < 0 ? 'analytics-line__item-profit--down' : null;
    console.log(data);
    element.innerHTML += `
    <div class="category-analytics__line analytics-line">
    <div class="analytics-line__top">
      <div class="analytics-line__title">
        <div class="analytics-line__title-text">
          Категория - ${data.title}.
        </div>
        <div class="analytics-line__title-report">
          Отчет За 30 дней
        </div>
      </div>
      <div class="analytics-line__positions ${positionStyle}">
        ${data.position} позиций
      </div>
    </div>
    <div class="analytics-line__content" data-simplebar>
      <ul class="analytics-line__list">
      ${data.categoryArray.map(item => {
      const positionStyle = item.position >= 0 ? 'analytics-line__item-profit--up' : 'analytics-line__item-profit--down';
      return `
          <li class="analytics-line__item">
            <div class="analytics-line__item-number">
              ${item.score}
            </div>
            <div class="analytics-line__item-profit ${positionStyle}">
              ${item.position}
            </div>
            <div class="analytics-line__item-date">
              ${item.date}
            </div>
          </li>
        `;
    }).join(' ')}
      </ul>
    </div>
  </div>
    `;

    if (data.subcategories) {
      data.subcategories.forEach(subcategory => {
        renderCategory(subcategory, analyticsList, false);
      })
    }
  }
}
