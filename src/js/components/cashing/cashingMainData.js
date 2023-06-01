import { searchForm, pageType } from "../vars";
import { renderTotalStat, renderBreadcrumbs, renderSellerCard } from "../render-table";
import { renderProductCard } from "../render-products";

const userId = document.body.getAttribute('data-user-id');

if (searchForm && userId) {
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
  if (!localStorage.getItem('idMainData')) {
    let obj = {};

    obj[userId] = {
      shop: null,
      category: null,
      product: null,
    };

    obj = JSON.stringify(obj);

    localStorage.setItem('idMainData', obj);

    return obj;
  }

  let obj = JSON.parse(localStorage.getItem('idMainData'));
  console.log(obj);
  const objArray = Object.keys(obj);

  if (objArray.includes(userId)) {
    console.log(obj);
    return obj[userId][pageType];
  } else {
    obj[userId] = {
      shop: null,
      category: null,
      product: null,
    };

    obj = JSON.stringify(obj);

    localStorage.setItem('idMainData', obj);

    return obj[userId][pageType];
  }
}

export function updateCashingIdMainData(pageType, cardData, totalData, breadcrumbs) {
  if (!userId) return;

  const obj = JSON.parse(localStorage.getItem('idMainData'));

  console.log(obj);

  if (pageType === 'shop') {
    obj[userId][pageType] = { cardData, totalData };
  }

  if (pageType === 'category') {
    const { title, category_id } = cardData;
    obj[userId][pageType] = { title, category_id, totalData, breadcrumbs };
  }

  if (pageType === 'product') {
    obj[userId][pageType] = { cardData, totalData, breadcrumbs };
  }

  JSON.stringify(localStorage.setItem('idMainData', JSON.stringify(obj)));
}
