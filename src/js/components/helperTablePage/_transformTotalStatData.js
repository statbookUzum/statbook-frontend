import { formatNumber } from "./_transformDataForTables";

export function transformTotalStatData(arr, flag) {
  let resultArray;

  if (flag === 'shop') {
    resultArray = [
      {
        title: 'Количество продуктов',
        value: arr[0].available_sku,
      },
      {
        title: 'Количество категорий',
        value: arr[0].categories_count,
      },
      {
        title: 'Средняя цена',
        value: arr[0].avg_purchase_price,
      },
      {
        title: 'Общая выручка',
        value: arr[0].revenue,
      }
    ];
  }

  if (flag === 'category') {
    const obj = {
      selled_amount: 0,
      revenue: 0,
      available_product: 0,
      sellers_count: 0,
    };

    arr.forEach(item => {
      obj['selled_amount'] += +item.selled_amount;
      obj['revenue'] += +item.revenue;
      obj['available_product'] += +item.available_product;
      obj['sellers_count'] += +item.sellers_count;
    });

    resultArray = [
      {
        title: 'Заказы',
        value: obj.selled_amount,
      },
      {
        title: 'Выручка',
        value: formatNumber(obj.revenue),
      },
      {
        title: 'Количество позиций',
        value: obj.available_product,
      },
      {
        title: 'Количество продавцов',
        value: obj.sellers_count,
      },
      {
        title: 'Количество подкатегорий',
        value: arr.length,
      }
    ];
  }

  return resultArray;
}
