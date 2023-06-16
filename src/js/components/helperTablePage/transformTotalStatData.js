import { formatNumber } from "./transformDataForTables";
import { changeLang } from "../change-lang";

export function transformTotalStatData(arr, flag, numOfSellers) {
  let resultArray;

  if (flag === 'shop') {
    resultArray = [
      {
        title: 'Продано товаров, шт',
        value: arr[0].selled_amount,
      },
      {
        title: 'Выручĸа, UZS',
        value: arr[0].revenue,
      },
      {
        title: 'Количество ĸатегорий',
        value: numOfSellers?.num_of_categories || changeLang('Данные обрабатываются'),
      },
      {
        title: 'Средний чеĸ',
        value: arr[0].avg_bill,
      }
    ];
  }

  if (flag === 'category') {
    const obj = {
      orders_amount_per_day: 0,
      revenue: 0,
      available_product: 0,
      sellers_count: numOfSellers ? numOfSellers.num_of_sellers : changeLang('Данные обрабатываются'),
    };

    arr.forEach(item => {
      obj['orders_amount_per_day'] += +item.orders_amount_per_day;
      obj['revenue'] += +item.revenue;
      obj['available_product'] += +item.available_sku;
    });

    resultArray = [
      {
        title: 'Количество подкатегорий',
        value: arr.length,
      },
      {
        title: 'Количество заĸазов',
        value: obj.orders_amount_per_day,
      },
      {
        title: 'Выручĸа, UZS',
        value: formatNumber(obj.revenue),
      },
      {
        title: 'Количество продавцов',
        value: obj.sellers_count,
      },
      {
        title: 'Количество позиций',
        value: numOfSellers ? numOfSellers.num_of_distinct_sku : changeLang('Данные обрабатываются'),
      },
    ];
  }

  return resultArray;
}
