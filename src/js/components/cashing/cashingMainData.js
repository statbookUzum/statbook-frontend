import { searchForm, pageType } from "../vars";
import { renderTotalStat, renderBreadcrumbs, renderSellerCard } from "../render-table";
import { renderProductCard } from "../render-products";
if (searchForm) {
  initMainData(pageType);
}

function initMainData(pageType) {
  const obj = cashingIdMainData(pageType);

  if (!obj) return;

  const hiddenInput = searchForm.querySelector('.custom-input__hidden-id');

  if (pageType === 'shop') {
    const sellerCard = document.querySelectorAll('[data-seller-card');
    const totalStat = document.querySelector('[data-total]');
    hiddenInput.setAttribute('value', obj.cardData.seller_id);

    renderSellerCard(obj.cardData, sellerCard);
    renderTotalStat(obj.totalData, totalStat);
  }

  if (pageType === 'category') {
    const totalStat = document.querySelector('[data-total]');
    const categoryName = document.querySelector('[data-title]');
    const breadcrumbsEl = document.querySelector('[data-breadcrumbs]');

    hiddenInput.setAttribute('value', obj.category_id);
    categoryName.textContent = obj.title;
    renderTotalStat(obj.totalData, totalStat);
    renderBreadcrumbs(obj.breadcrumbs, breadcrumbsEl);
  }

  if (pageType === 'product') {
    const productCard = document.querySelector('[data-product-card]');
    hiddenInput.setAttribute('value', obj.cardData.product_id);

    renderProductCard(obj.cardData, productCard, obj.breadcrumbs);
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
    const { title, category_id } = cardData;
    obj[pageType] = { title, category_id, totalData, breadcrumbs };
  }

  if (pageType === 'product') {
    obj[pageType] = { cardData, totalData, breadcrumbs };
  }

  JSON.stringify(localStorage.setItem('idMainData', JSON.stringify(obj)));
}
