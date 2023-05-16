import { renderTotalStat, renderBreadcrumbs, renderSellerCard } from "../render-table";
import { renderProductCard } from "../render-products";

const pageType = document.querySelector('.main').getAttribute('data-page-type');

initMainData(pageType);

function initMainData(pageType) {
  const obj = cashingIdMainData(pageType);

  if (!obj) return;

  if (pageType === 'shop') {
    const sellerCard = document.querySelectorAll('[data-seller-card');
    const totalStatList = document.querySelectorAll('[data-total]');

    renderSellerCard(obj.cardData, sellerCard);
    renderTotalStat(obj.totalData, totalStatList);
  }

  if (pageType === 'category') {
    const totalStatList = document.querySelectorAll('[data-total]');
    const categoryName = document.querySelector('[data-title]');
    const breadcrumbsList = document.querySelectorAll('[data-breadcrumbs]');

    categoryName.textContent = obj.title;
    renderTotalStat(obj.totalData, totalStatList);
    renderBreadcrumbs(obj.breadcrumbs, breadcrumbsList);
  }

  if (pageType === 'product') {
    const productCard = document.querySelector('[data-product-card]');

    renderProductCard(obj.cardData, productCard);
  }
}

export function cashingIdMainData(pageType) {
  if (localStorage.getItem('idMainData')) {
    const obj = JSON.parse(localStorage.getItem('idMainData'));

    return obj[pageType];
  } else {
    let obj = {
      shop: null,
      category: null,
      product: null,
    }

    obj = JSON.stringify(obj);

    localStorage.setItem('idMainData', obj);
  }
}

export function updateCashingIdMainData(pageType, cardData, totalData, breadcrumbs) {
  const obj = JSON.parse(localStorage.getItem('idMainData'));

  if (pageType === 'shop') {
    obj[pageType] = { cardData, totalData };
  }

  if (pageType === 'category') {
    const { title } = cardData;
    obj[pageType] = { title, totalData, breadcrumbs };
  }

  if (pageType === 'product') {
    obj[pageType] = { cardData, totalData };
  }

  JSON.stringify(localStorage.setItem('idMainData', JSON.stringify(obj)));
}
