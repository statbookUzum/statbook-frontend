import { removeYearFromDate } from "../helper";

export function transformChartsData(arr) {
  const sortArr = arr.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  const resultObj = {
    dateArr: [],
    saleArr: [],
    priceArr: [],
    lostArr: [],
  };

  sortArr.forEach((obj) => {
    resultObj.dateArr.push(removeYearFromDate(obj.date));

    resultObj.saleArr.push(obj.selled_amount);
    resultObj.priceArr.push(obj.purchase_price);
    resultObj.lostArr.push(obj.available_amount);
  });

  return resultObj;
}
