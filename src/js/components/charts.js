import { Chart } from "chart.js/auto";
const saleChart = document.getElementById('saleChart');
const priceChart = document.getElementById('priceChart');
const lostChart = document.getElementById('lostChart');

const chartSaleData = [
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
];

if (saleChart) {
  const labelsData = chartSaleData.map((item, index) => {
    // if (index + 1 === 1) {
    //   return item.date;
    // }

    // if ((index + 1) % 5 === 0) {
    //   return item.date;
    // }

    return item.date;
  });

  const valueData = chartSaleData.map(item => item.value);

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
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            display: false,
          },
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
              color: 'rgba(4, 15, 35, 0.25)',
              weight: 600,
            }
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
  const labelsData = chartSaleData.map((item, index) => {
    // if (index + 1 === 1) {
    //   return item.date;
    // }

    // if ((index + 1) % 5 === 0) {
    //   return item.date;
    // }

    return item.date;
  });

  const valueData = chartSaleData.map(item => item.value);

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
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            display: false,
          },
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
              color: 'rgba(4, 15, 35, 0.25)',
              weight: 600,
            }
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
  const labelsData = chartSaleData.map((item, index) => {
    // if (index + 1 === 1) {
    //   return item.date;
    // }

    // if ((index + 1) % 5 === 0) {
    //   return item.date;
    // }

    return item.date;
  });

  const valueData = chartSaleData.map(item => item.value);

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
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            display: false,
          },
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
              color: 'rgba(4, 15, 35, 0.25)',
              weight: 600,
            }
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
