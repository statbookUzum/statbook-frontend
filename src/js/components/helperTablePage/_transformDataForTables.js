export function transformDataForTable(data) {
  const arrData = Object.entries(data);
  const obj = {};
  const deleteableProp = ['category_id', 'date_range', 'seller_id'];

  if (data.result === 'Информации не найдено') {
    console.log('Информации не найдено');
    return { analyze: [], review: [] };
  }

  arrData.forEach(el => {
    const sortedHeader = sortTableArray(Object.entries(removePropertyFromObj(el[1][0], deleteableProp)), 'header');
    obj[el[0]] = [renameTableHeader(sortedHeader)];

    el[1].forEach(item => {
      const transformItem = transformObjProperty(removePropertyFromObj(item, deleteableProp));

      obj[el[0]].push(sortTableArray(Object.entries(transformItem)));
    });
  });

  return obj;
}

function transformObjProperty(obj) {
  for (let prop in obj) {
    if (prop === 'avg_rating' || prop === 'avg_product_rating' || prop === 'rating') {
      obj[prop] = +obj[prop] % 1 !== 0 ? (+obj[prop]).toFixed(2) : +obj[prop];

      continue;
    }

    if (prop === 'missed_revenue_percent') {
      obj[prop] = +obj[prop] % 1 !== 0 ? (+obj[prop]).toFixed(1) + '%' : +obj[prop] + '%';

      continue;
    }

    if (!isNaN(obj[prop])) {
      if (+obj[prop] % 1 !== 0) {
        obj[prop] = formatNumber((+obj[prop]).toFixed())
      } else {
        obj[prop] = +obj[prop];
      }
      // obj[prop] = +obj[prop] % 1 !== 0 ? formatNumber((+obj[prop]).toFixed()) : +obj[prop];

      continue;
    }
  }

  return obj;
}

export function formatNumber(num) {
  let result;

  if (num >= 1000000000) {
    result = (num / 1000000000).toFixed(0) + " млрд.";
  } else if (num >= 1000000) {
    result = (num / 1000000).toFixed(0) + " млн.";
  } else if (num >= 1000) {
    result = (num / 1000).toFixed(0) + " тыс.";
  } else {
    result = num.toString();
  }

  return result.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
}

function renameTableHeader(arr) {
  const renameObj = {
    photo: 'Изображения',
    title: 'Название товара',
    sku: 'SKU',
    product_id: 'ID товара',
    seller_id: 'ID продавца',
    seller_title: 'Продавец',
    actual_price: 'Цена',
    category_id: 'ID категории',
    category_title_ru: 'Название категории(рус)',
    category_title_uz: 'Название категории(узб)',
    sellers_count: 'Количество продавцов',
    avg_rating: 'Средний рейтинг',
    selled_per_for_period: 'Кол-во продаж',
    revenue: 'Выручка',
    revenue_base: 'Базовая выручка',
    available_amount: 'Остаток',
    reviews_amount: 'Кол-во отзывов',
    avg_product_rating: 'Средний рейтинг',
    turnover: 'Оборачиваемость',
    days_with_remaining_product: 'Дней в наличии',
    date_range: 'Период времени',
    average_price: 'Средняя цена',
    average_base_price: 'Средняя базовая цена',
    predicted_revenue: 'Прогнозируемая выручка',
    missed_revenue: 'Упущенная выручка',
    missed_revenue_percent: 'Процент(%) упущенной выручки',
    available_amount_price: 'Стоимость остатков',
    categories_count: 'Количество категорий',
    available_sku: 'Остаток',
    available_product: 'Количество товаров',
    selled_amount: 'Проданное количество',
    avg_revenue: 'Средний доход',
    remaining_products_value: 'Стоимость остатков',
    avg_purchase_price: 'Средняя цена покупки',
    num_of_active_product: 'Кол-во активных товаров',
    num_of_active_seller: 'Кол-во активных продавцов',
    avg_product_selled_amount: 'Среднее кол-во проданного товара',
    rating: 'Рейтинг',
  }

  return arr.map(item => {

    return renameObj[item] ? renameObj[item] : item;
  });
}

function sortTableArray(arr, arrayType) {
  const sortOrder = { photo: 1, title: 2, sku: 3 };
  const sortedArray = arr.sort((a, b) => {
    const aVal = sortOrder[a[0]] || 999;
    const bVal = sortOrder[b[0]] || 999;
    return aVal - bVal;
  });

  if (arrayType === 'header') {
    return sortedArray.map(item => item[0]);
  }

  return sortedArray.map(item => item[1]);
}

function removePropertyFromObj(obj, deleteablePropArr) {
  deleteablePropArr.forEach(prop => {
    delete obj[prop];
  });

  return obj;
}
