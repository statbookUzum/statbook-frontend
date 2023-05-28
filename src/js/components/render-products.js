import { formatNumber } from "./helperTablePage/_transformDataForTables";
import { removeYearFromDate } from "./helper";
import { changeLang } from "./change-lang";

export function renderProductCard(data, element, breadcrumbs) {
  const { title, avg_purchase_price, seller_title, photo, rating, reviews_amount, actual_purchase_price, remaining_product, } = data;

  element.innerHTML = `
  <div class="product-info__image">
  <img src="${photo ? photo : './img/product-test-image.jpg'}"
    alt="${title}">
  </div>
  <div class="product-info__breadcrumbs">
  ${Object.values(breadcrumbs).map((item, index, items) => {
    return `<div>${index + 1 !== items.length ? item.category_title + '/' : item.category_title}</div>`;
  }).join(' ')}
  </div>
  <div class="product-info__title">
    ${title}
  </div>
  <div class="product-info__reviews">
        <span class="product-info__reviews-score">${rating}</span> (<span class="product-info__reviews-count">${reviews_amount} </span> ${changeLang('отзывов')})
      </div>
  <div class="product-info__price">
    ${changeLang('Цена')}: <span class="product-info__price-amount">${formatNumber((+actual_purchase_price).toFixed(0))}</span> <span
      class="product-info__price-currency">${changeLang('сум')}</span>
  </div>
  <div class="product-info__seller">
    ${changeLang('Продавец')}: <span class="product-info__seller-name">${seller_title}</span>
  </div>
  <div class="product-info__price-avg">
  ${changeLang('Ср. цена продаж')}: <span class="product-info__price-avg-amount">${formatNumber((+avg_purchase_price).toFixed(0))}</span> <span
      class="product-info__price-currency">${changeLang('сум')}</span>
  </div>
  <div class="product-info__lost">
    ${changeLang('Остаток (в наличии)')}: <span class="product-info__lost-count">${remaining_product} ${changeLang('шт.')}</span>
  </div>
  <div class="product-info__description">
  </div>
`;
}

export function renderTotalStat(data, elements) {
  const { revenue, selled_amount, date_range } = data;

  elements.forEach(element => {
    if (element.matches('[data-total-sale]')) {
      element.textContent = +selled_amount < 0 ? 0 : selled_amount;
    }

    if (element.matches('[data-total-profit]')) {
      element.innerHTML = +revenue < 0 ? 0 : formatNumber((+revenue).toFixed());
    }

    if (element.matches('[data-total-average]')) {
      element.textContent = +selled_amount < 0 ? 0 : (+selled_amount / +date_range).toFixed(2);
    }
  });
}

export function renderCategory(data, element) {
  element.innerHTML = '';

  for (let category in data) {
    if (category == '1') continue;

    const dataArray = Object.entries(data[category].data);
    dataArray.sort((a, b) => {
      const dateA = new Date(a[0]).getTime();
      const dateB = new Date(b[0]).getTime();

      return dateA - dateB;
    });

    let totalProfit = dataArray.length && dataArray[0][1].positionNumber >= dataArray[dataArray.length - 1][1].positionNumber ? 'analytics-line__positions--down' : '';

    element.innerHTML += `
    <div class="category-analytics__line analytics-line">
    <div class="analytics-line__top">
      <div class="analytics-line__title">
        <div class="analytics-line__title-text">
          Категория - ${data[category].category_title}.
        </div>
      </div>
      <div class="analytics-line__positions ${totalProfit}" style="display: ${String(data[category].data) == '101' ? 'none' : 'block'}"></div>
    </div>
    <div class="analytics-line__content" data-simplebar>
      <ul class="analytics-line__list">
      ${String(data[category].data) == '101'
        ? 'К сожалению, информация по данной категории отсутствует.'
        : dataArray.map(item => {
          const positionStyle = item[1].delta >= 0 ? 'analytics-line__item-profit--up' : 'analytics-line__item-profit--down';

          return `
          <li class="analytics-line__item">
            <div class="analytics-line__item-number">
              ${item[1].positionNumber == '101' ? '99+' : item[1].positionNumber}
            </div>
            <div class="analytics-line__item-profit ${positionStyle}">
            <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
            <svg width="17px" height="17px" viewBox="0 0 24 24" fill=${item[1].delta >= 0 ? "#32af99" : "#c24141"} style="transform: rotate(${item[1].delta >= 0 ? '0' : '-180deg'}); display: ${item[1].delta === 0 ? 'none' : 'block'}" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C12.2652 3 12.5196 3.10536 12.7071 3.29289L19.7071 10.2929C20.0976 10.6834 20.0976 11.3166 19.7071 11.7071C19.3166 12.0976 18.6834 12.0976 18.2929 11.7071L13 6.41421V20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V6.41421L5.70711 11.7071C5.31658 12.0976 4.68342 12.0976 4.29289 11.7071C3.90237 11.3166 3.90237 10.6834 4.29289 10.2929L11.2929 3.29289C11.4804 3.10536 11.7348 3 12 3Z"/>
            </svg>
            </div>
            <div class="analytics-line__item-date">
              ${removeYearFromDate(item[0])}
            </div>
          </li>
        `;
        }).join(' ')}
      </ul>
    </div>
  </div>
    `;
  }
}
