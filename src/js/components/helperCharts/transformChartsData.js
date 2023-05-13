import { removeYearFromDate } from "../helper";

export function transformChartsData(arr) {
  const resultObj = {
    dateArr: [],
    saleArr: [],
    priceArr: [],
    lostArr: [],
  }

  arr.forEach(obj => {
    resultObj.dateArr.push(removeYearFromDate(obj.date));

    if (obj.selled_amount >= 0) {
      resultObj.saleArr.push(obj.selled_amount);
    } else {
      console.log(0);
      resultObj.saleArr.push('0');
    }

    resultObj.priceArr.push(obj.purchase_price);
    resultObj.lostArr.push(obj.available_amount);
  });

  return resultObj;
}
