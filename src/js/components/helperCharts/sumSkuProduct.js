export function totalProductCardInfo(data) {
  const resultObj = {};

  resultObj.avg_purchase_price =
    data.reduce((acc, item) => {
      return +acc + +item.avg_purchase_price;
    }, 0) /
      data.length +
    "";

  resultObj.seller_title = data[0].seller_title;
  resultObj.photo = data[0].photo;
  resultObj.rating = data[0].rating;
  resultObj.reviews_amount = data[0].reviews_amount;
  resultObj.product_id = data[0].product_id;

  resultObj.actual_purchase_price =
    data.reduce((acc, item) => {
      return +acc + +item.actual_purchase_price;
    }, 0) /
      data.length +
    "";

  resultObj.remaining_product =
    data.reduce((acc, item) => {
      return +acc + +item.remaining_product;
    }, 0) + "";

  resultObj.revenue =
    data.reduce((acc, item) => {
      return +acc + +item.revenue;
    }, 0) + "";

  resultObj.selled_amount =
    data.reduce((acc, item) => {
      return +acc + +item.selled_amount;
    }, 0) + "";

  resultObj.date_range = data[0].date_range;

  return resultObj;
}

export function totalChartsData(data) {
  const currentObj = {};

  data.forEach((item) => {
    if (!currentObj[item.date]) {
      currentObj[item.date] = {
        available_amount: +item.available_amount,
        product_id: item.product_id,
        selled_amount: +item.selled_amount,
        purchase_price: +item.purchase_price,
        date: item.date,
      };

      return;
    }

    currentObj[item.date].available_amount += +item.available_amount;
    currentObj[item.date].selled_amount += +item.selled_amount;
    currentObj[item.date].product_id = item.product_id;
    currentObj[item.date].date = item.date;
    currentObj[item.date].purchase_price =
      (currentObj[item.date].purchase_price + +item.purchase_price) / 2;
  });

  return Object.values(currentObj);
}
