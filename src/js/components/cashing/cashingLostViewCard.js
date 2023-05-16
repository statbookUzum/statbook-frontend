export function getCashingLostViewCard(pageType) {
  let cashingData;

  if (localStorage.getItem('lostViewCardShop') && pageType === 'shop') {
    cashingData = localStorage.getItem('lostViewCardShop');
  } else if (localStorage.getItem('lostViewCardProduct') && pageType === 'product') {
    cashingData = localStorage.getItem('lostViewCardProduct');
  } else {
    return [];
  }

  cashingData = JSON.parse(cashingData);
  return cashingData;
}

export function setCashingLostViewCard(data, typePage) {
  if (typePage === 'shop') {
    if (!localStorage.getItem('lostViewCardShop')) {
      let cashingData = [];

      cashingData.unshift(data);
      cashingData = JSON.stringify(cashingData);
      localStorage.setItem('lostViewCardShop', cashingData);

      return;
    }

    let cardItems = localStorage.getItem('lostViewCardShop');
    cardItems = JSON.parse(cardItems);

    for (let item of cardItems) {
      if (item.id === data.id) return;
    }
    cardItems.unshift(data);

    if (cardItems.length > 3) cardItems.pop();

    cardItems = JSON.stringify(cardItems);
    localStorage.setItem('lostViewCardShop', cardItems);
  }

  if (typePage === 'product') {
    if (!localStorage.getItem('lostViewCardProduct')) {
      let cashingData = [];

      cashingData.unshift(data);
      cashingData = JSON.stringify(cashingData);
      localStorage.setItem('lostViewCardProduct', cashingData);

      return;
    }

    let cardItems = localStorage.getItem('lostViewCardProduct');
    cardItems = JSON.parse(cardItems);

    for (let item of cardItems) {
      if (item.title === data.title) return;
    }
    cardItems.unshift(data);

    if (cardItems.length > 3) cardItems.pop();

    cardItems = JSON.stringify(cardItems);
    localStorage.setItem('lostViewCardProduct', cardItems);
  }
}
