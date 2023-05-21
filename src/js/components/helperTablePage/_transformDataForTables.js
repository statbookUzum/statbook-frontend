export function transformDataForTable(data, pageType) {
  console.log(data);
  const arrData = Object.entries({ review: data.review, analyze: data.analyze });
  const obj = {};
  let deleteableProp;

  if (data.result === 'Информации не найдено') {
    console.log('Информации не найдено');
    return { analyze: [], review: [] };
  }

  arrData.forEach(el => {
    if (el[0] === 'review' && pageType === 'shop') {
      deleteableProp = ['date_range', 'seller_id', 'seller_title'];
    }

    if (el[0] === 'review' && pageType === 'category') {
      deleteableProp = ['category_id', 'date_range', 'seller_id', 'categories_count', 'category_graph_ru', 'category_graph_uz'];
    }

    if (el[0] === 'analyze' && pageType === 'shop') {
      deleteableProp = ['seller_id', 'selled_amount', 'categories_count', 'revenue', 'avg_revenue', 'average_price', 'avg_bill', 'date_range', 'orders_amount_per_day', 'avg_purchase_price'];
    }

    const sortedHeader = sortTableArray(Object.entries(removePropertyFromObj(el[1][0], deleteableProp)), 'header', el[0]);
    obj[el[0]] = [renameTableHeader(sortedHeader)];



    el[1].forEach(item => {
      const transformItem = transformObjProperty(removePropertyFromObj(item, deleteableProp));

      obj[el[0]].push(sortTableArray(Object.entries(transformItem), null, el[0]));
    });
  });

  console.log(obj);

  return obj;
}

function transformObjProperty(obj) {
  for (let prop in obj) {
    if (prop)
      if (prop === 'avg_rating' || prop === 'avg_product_rating' || prop === 'rating') {
        obj[prop] = +obj[prop] % 1 !== 0 ? (+obj[prop]).toFixed(2) : +obj[prop];

        continue;
      }

    if (prop === 'missed_revenue_percent') {
      obj[prop] = +obj[prop] % 1 !== 0 ? (+obj[prop]).toFixed(1) + '%' : +obj[prop] + '%';

      continue;
    }
  }

  return obj;
}

export function transformTableItem(item) {
  if (!isNaN(item)) {
    if (typeof (item) === 'string' && (item).includes('.')) {
      return formatNumber(item);
    }
  }

  return item;
}

export function formatNumber(num) {
  if (+num <= 0) return 0;

  let result;
  let afterDot = 0;
  let divider = 0.99999;
  let unit = '';

  if (num >= 1000000000) {
    divider = 1000000000;
    unit = '&nbsp;млрд.';
  } else if (num >= 1000000) {
    divider = 1000000;
    unit = '&nbsp;млн.';
  } else if (num >= 1000) {
    divider = 1000;
    unit = '&nbsp;тыс.';
  }

  const fixedNum = (+num / divider).toFixed(0);

  if (String(fixedNum).length >= 3) {
    afterDot = 0;
  } else if (String(fixedNum).length === 2) {
    afterDot = 1;
  } else {
    afterDot = 2;
  }
  result = (+num / divider).toFixed(afterDot) + unit;

  // return result.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
  return result;
}

function renameTableHeader(arr) {
  const renameObj = {
    photo: 'Изображения',
    title: 'Название товара',
    sku: 'SKU',
    product_id: 'ID товара',
    seller_id: 'ID продавца',
    seller_title: 'Продавец',
    actual_price: 'Теĸущая цена, UZS',
    category_id: 'ID категории',
    category_title_ru: 'Название категории(рус)',
    category_title_uz: 'Название категории(узб)',
    sellers_count: 'Количество продавцов',
    avg_rating: 'Средний рейтинг',
    selled_per_for_period: 'Кол-во продаж, шт',
    avg_base_price: 'Ср. Базовая цена,. UZS',
    revenue: 'Выручка, UZS',
    revenue_base: 'Базовая выручка, UZS',
    available_amount: 'Остаток (в наличии), шт.',
    reviews_amount: 'Кол-во отзывов',
    avg_product_rating: 'Средний рейтинг',
    turnover: 'Оборачиваемость, дней',
    days_with_remaining_product: 'Дней в наличии',
    date_range: 'Период времени',
    average_price: 'Средняя цена, UZS',
    average_base_price: 'Ср. базовая цена, UZS',
    predicted_revenue: 'Прогнозируемая выручĸа, UZS',
    missed_revenue: 'Упущенная выручĸа, UZS',
    missed_revenue_percent: 'Доля упущенной выручĸи, %',
    available_amount_price: 'Стоимость остатков',
    categories_count: 'Количество категорий',
    available_sku: 'Остатоĸ (в наличии), шт.',
    available_product: 'Количество товаров',
    selled_amount: 'Проданное количество',
    avg_revenue: 'Средний доход',
    remaining_products_value: 'Стоимость остатĸов (по теĸ. цене), UZS',
    avg_purchase_price: 'Средняя цена, UZS',
    num_of_active_product: 'Кол-во активных товаров',
    num_of_active_seller: 'Кол-во активных продавцов',
    avg_product_selled_amount: 'Среднее кол-во проданного товара',
    rating: 'Рейтинг',
    num_of_active_category: 'Кол-во активных категорий',
    avg_bill: 'Средний чеĸ',
    orders_amount_per_day: 'Количество заказов',
  }

  return arr.map(item => {

    return renameObj[item] ? renameObj[item] : item;
  });
}

function sortTableArray(arr, arrayType, tableType) {
  let sortOrder;

  if (tableType === 'analyze') {
    sortOrder = {
      available_product: 1,
      num_of_active_product: 2,
      available_sku: 3,
      remaining_products_value: 4,
      num_of_active_category: 5,
    };
  } else {
    sortOrder = {
      photo: 1,
      title: 2,
      product_id: 3,
      sku: 4,
      actual_price: 5
    };
  }

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
  const copyObj = JSON.parse(JSON.stringify(obj));

  console.log(deleteablePropArr);

  deleteablePropArr.forEach(prop => {
    delete copyObj[prop];
  });

  return copyObj;
}
