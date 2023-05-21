import { formatNumber } from "./_transformDataForTables";

export function transformTotalStatData(arr, flag) {
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
        value: arr[0].categories_count,
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
      sellers_count: 0,
    };

    arr.forEach(item => {
      obj['orders_amount_per_day'] += +item.orders_amount_per_day;
      obj['revenue'] += +item.revenue;
      obj['available_product'] += +item.available_product;
      obj['sellers_count'] += +item.sellers_count;
    });

    console.log(obj.revenue);

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
        title: 'Количество товаров',
        value: obj.available_product,
      },
    ];
  }

  return resultArray;
}
