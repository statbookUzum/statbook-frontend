import { setHeight } from './helper';

export function renderBreadcrumbs(data, elements) {
  elements.forEach(element => {
    element.innerHTML = '';

    data.forEach(item => {
      element.innerHTML += `<li class="shop-report__breadcrumbs-item">${item}</li>`;
    });
  });
}

export function renderTotalStat(data, elements) {
  elements.forEach(element => {
    element.innerHTML = '';

    data.forEach(item => {
      element.innerHTML += `
    <li class="report-statistic__item">
      <div class="report-statistic__title">
        ${item.title}
      </div>
      <span class="report-statistic__value">
        ${item.value}
      </span>
    </li>
    `
    });
  });
}

export function renderTable(tables, elements) {
  elements.forEach(element => {
    let data;

    if (element.hasAttribute('data-table-analytic')) {
      data = tables.analyze;
    }

    if (element.hasAttribute('data-table-review')) {
      data = tables.review;
    }

    const imageLinkRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;

    element.innerHTML = `
                        <tr class="table__header">
                          ${data[0].map(el => {
      if (el.toLowerCase() === 'категория' || el.toLowerCase() === 'остаток') {
        return `<th>
                                <button class="table__filter-button btn-reset">
                                  ${el}
                                </button>
                              </th>`
      }

      return `<th>${el}</th>`
    }).join(' ')}
                        </tr>
                        ${data.map((arr, i) => {
      if (i !== 0) {
        return `<tr>${arr.map((el, i) => {
          if (imageLinkRegex.test(el)) {
            return `<td><img src="${el}" alt="${arr[i + 1]}"></td>`
          }

          return `<td>${el}</td>`
        }).join(' ')}</tr>`
      }
    }).join(' ')}
                        `;
  });

  setTimeout(setHeight, 100);
}

export function renderSellerCard(data, elements) {
  const { title, rating, registration_date, reviews_amount, description } = data;
  const dateObj = new Date(registration_date);

  const day = dateObj.getDate();
  const month = dateObj.getMonth();
  console.log(month);
  const year = dateObj.getFullYear();

  const monthNamesGenitive = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"
  ];

  elements.forEach(element => {
    element.innerHTML = `
    <div class="seller-card__image">
      <img src="./img/seller-card-default.svg" alt="Top Seller">
    </div>
    <div class="seller-card__info">
      <div class="seller-card__info-top">
        <h2 class="seller-card__title">
          ${title}
        </h2>
      <div class="seller-card__reviews">
        <span class="seller-card__reviews-score">${rating}</span> (<span
          class="seller-card__reviews-count">${reviews_amount} </span> отзывов)
      </div>
    </div>
    <div class="seller-card__start">
      Продавец на UZUM с <span>${day} ${monthNamesGenitive[month]} ${year} года</span>
    </div>
    <div class="seller-card__desc">
      ${description}
    </div>
    `;
  });
}
