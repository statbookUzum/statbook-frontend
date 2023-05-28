import { Chart } from "chart.js/auto";
import { changeLang } from "../change-lang";

const saleChart = document.getElementById('saleChart');
const priceChart = document.getElementById('priceChart');
const lostChart = document.getElementById('lostChart');
const priceLevelSpan = document.querySelector('.chart-span--price');

let labelsData = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];

export const saleCht = !saleChart ? null : new Chart(saleChart, {
  type: 'bar',
  data: {
    labels: [],
    datasets: [{
      label: changeLang('График продаж'),
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
          callback: (value, index, items) => {
            return value;
          },
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
          callback: (value, index, items) => {
            if (index + 1 === 1) {
              return saleCht.data.labels[index];
            }

            if (items.length === 7 && index + 1 === 4) {
              return saleCht.data.labels[3];
            }

            if ((index + 1) % 5 === 0 && items.length !== 7) {
              return saleCht.data.labels[index];
            }

            if ((index + 1) === items.length) {
              return saleCht.data.labels[index];
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
            label += ' ' + changeLang('шт.');
            return label;
          }
        }
      }
    }
  }
});

export const priceCht = !priceChart ? null : new Chart(priceChart, {
  type: 'bar',
  data: {
    labels: [],
    datasets: [{
      label: changeLang('График цены'),
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
          callback: (value, index, items) => {
            const lastIndex = items[items.length - 1];
            if (value === 0) return value;
            if (index === 1) {
              priceLevelSpan.textContent = lastIndex.value > 1000000 ? changeLang('Млн') : changeLang('Тыс') + '.';
            }
            const num = (value / (lastIndex.value > 1000000 ? 1000000 : 1000));

            return num % 1 === 0 ? num.toFixed(1) : num;
          },
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
          display: false,
        },
        ticks: {
          callback: (value, index, items) => {
            if (index + 1 === 1) {
              return priceCht.data.labels[index];
            }

            if (items.length === 7 && index + 1 === 4) {
              return priceCht.data.labels[3];
            }

            if ((index + 1) % 5 === 0 && items.length !== 7) {
              return priceCht.data.labels[index];
            }

            if ((index + 1) === items.length) {
              return priceCht.data.labels[index];
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
            label += ' ' + changeLang('сум');
            return label;
          }
        }
      }
    }
  }
});

export const lostCht = !lostChart ? null : new Chart(lostChart, {
  type: 'bar',
  data: {
    labels: [],
    datasets: [{
      label: changeLang('График остатков'),
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
          callback: (value, index, items) => {
            if (index + 1 === 1) {
              return lostCht.data.labels[index];
            }

            if (items.length === 7 && index + 1 === 4) {
              return lostCht.data.labels[3];
            }

            if ((index + 1) % 5 === 0 && items.length !== 7) {
              return lostCht.data.labels[index];
            }

            if ((index + 1) === items.length) {
              return lostCht.data.labels[index];
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
            label += ' ' + changeLang('шт.');
            return label;
          }
        }
      }
    }
  }
});

export function setLabelsData(value) {
  labelsData = value;
}
