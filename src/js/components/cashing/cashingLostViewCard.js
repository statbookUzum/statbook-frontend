import { userId } from "../vars";

export function getCashingLostViewCard(pageType) {
  let cashingData = null;

  if (localStorage.getItem('lostViewCardShop')) {
    localStorage.removeItem('lostViewCardShop');
  }

  if (localStorage.getItem('lostViewCardProduct')) {
    localStorage.removeItem('lostViewCardProduct');
  }

  if (pageType === 'shop' && localStorage.getItem('lostViewCardShopV2')) {
    cashingData = JSON.parse(localStorage.getItem('lostViewCardShopV2'))[userId];
  }

  if (pageType === 'product' && localStorage.getItem('lostViewCardProductV2')) {
    cashingData = JSON.parse(localStorage.getItem('lostViewCardProductV2'))[userId];
  }

  if (!cashingData) return [];

  return cashingData;
}

export function setCashingLostViewCard(data, typePage) {
  let typeOfCash = typePage === 'shop' ? 'lostViewCardShopV2' : 'lostViewCardProductV2';
  let lostCardObj = null;
  let cashObj = {};

  if (localStorage.getItem(`${typeOfCash}`)) {
    cashObj = JSON.parse(localStorage.getItem(`${typeOfCash}`));
    lostCardObj = cashObj[userId];
  }

  if (!lostCardObj) {
    lostCardObj = [];
    lostCardObj.unshift(data);

    cashObj[userId] = lostCardObj;
    cashObj = JSON.stringify(cashObj);
    localStorage.setItem(`${typeOfCash}`, cashObj);

    return;
  }

  for (let item of lostCardObj) {
    if (typePage === 'shop') {
      if (item.id === data.id) return;
    }

    if (typePage === 'product') {
      if (item.product_id === data.product_id) return;
    }
  }
  lostCardObj.unshift(data);

  if (lostCardObj.length > 3) lostCardObj.pop();

  cashObj[userId] = lostCardObj;

  cashObj = JSON.stringify(cashObj);
  localStorage.setItem(`${typeOfCash}`, cashObj);
}
