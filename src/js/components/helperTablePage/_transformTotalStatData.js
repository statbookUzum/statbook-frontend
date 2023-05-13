export function transformTotalStatData(arr, flag) {
  let resultArray;

  console.log(arr);

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
    resultArray = [
      {
        title: 'Заказы',
        value: arr[0].selled_amount,
      },
      {
        title: 'Выручка',
        value: arr[0].revenue,
      },
      {
        title: 'Количество позиций',
        value: arr[0].available_product,
      },
      {
        title: 'Количество продавцов',
        value: arr[0].sellers_count,
      },
      {
        title: 'Количество подкатегорий',
        value: arr.length,
      }
    ];
  }

  return resultArray;
}
