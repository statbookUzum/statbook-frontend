import { typeOfLang } from "../vars";
import { changeLang } from "../change-lang";

export function transformDataForTable(data, pageType) {
  const arrData = Object.entries({
    review: data.review,
    analyze: data.analyze,
  });

  const obj = {};
  let deleteableProp;

  if (data.result === "Информации не найдено") {
    console.log("Информации не найдено");
    return { analyze: [], review: [] };
  }

  arrData.forEach((el) => {
    if (el[0] === "review" && pageType === "shop") {
      deleteableProp = ["date_range", "seller_id", "seller_title"];
    }

    if (el[0] === "review" && pageType === "category") {
      deleteableProp = [
        "category_id",
        "date_range",
        "seller_id",
        "categories_count",
        "category_graph_ru",
        "category_graph_uz",
        "n",
      ];

      el[1][0].link = `https://uzum.uz/ru/product/${el[1][0].product_id}?skuid=${el[1][0].sku}`;
    }

    if (el[0] === "analyze" && pageType === "category") {
      deleteableProp = ["link", "date_range"];
    }

    if (el[0] === "analyze" && pageType === "shop") {
      deleteableProp = [
        "seller_id",
        "selled_amount",
        "categories_count",
        "revenue",
        "avg_revenue",
        "average_price",
        "avg_bill",
        "date_range",
        "orders_amount_per_day",
        "avg_purchase_price",
      ];
    }

    const sortedHeader = sortTableArray(
      Object.entries(el[1][0]),
      "header",
      el[0],
      deleteableProp
    );

    // add category_link
    if (el[0] === "analyze" && pageType === "category") {
      sortedHeader.push("category_link");
    }

    obj[el[0]] = [renameTableHeader(sortedHeader, typeOfLang)];

    el[1].forEach((item) => {
      const transformItem = transformObjProperty(item);

      if (el[0] === "review" && pageType === "category") {
        transformItem.link = `https://uzum.uz/ru/product/${transformItem.product_id}?skuid=${transformItem.sku}`;
      }

      if (el[0] === "analyze" && pageType === "category") {
        transformItem.category_link = `https://uzum.uz/ru/category/${transformItem.category_id}`;
      }

      obj[el[0]].push(
        sortTableArray(
          Object.entries(transformItem),
          null,
          el[0],
          deleteableProp
        )
      );
    });
  });

  return obj;
}

function transformObjProperty(obj) {
  for (let prop in obj) {
    if (!prop) continue;

    if (prop === "characteristics" && obj[prop] === null) {
      obj[prop] = changeLang("Характеристики отсутствуют");

      continue;
    }

    if (
      prop === "avg_rating" ||
      prop === "avg_product_rating" ||
      prop === "rating"
    ) {
      obj[prop] = +obj[prop] % 1 !== 0 ? (+obj[prop]).toFixed(2) : +obj[prop];

      continue;
    }

    if (prop === "missed_revenue_percent") {
      obj[prop] =
        +obj[prop] % 1 !== 0 ? (+obj[prop]).toFixed(1) + "%" : +obj[prop] + "%";

      continue;
    }
  }

  return obj;
}

export function transformTableItem(item) {
  if (+item < 0) {
    return 0;
  }

  if (item == null) {
    item = changeLang("Данные обрабатываются");
  }

  if (!isNaN(item)) {
    if (typeof item === "string" && item.includes(".")) {
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
  let unit = "";

  if (num >= 1000000000) {
    divider = 1000000000;
    unit = `&nbsp;${changeLang("млрд")}.`;
  } else if (num >= 1000000) {
    divider = 1000000;
    unit = `&nbsp;${changeLang("млн")}.`;
  } else if (num >= 1000) {
    divider = 1000;
    unit = `&nbsp;${changeLang("тыс")}.`;
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

function renameTableHeader(arr, langType) {
  const renameObjRu = {
    photo: "Изображение",
    title: "Название товара",
    sku: "SKU",
    product_id: "ID товара",
    seller_id: "ID продавца",
    seller_title: "Продавец",
    actual_price: "Теĸущая цена, UZS",
    category_id: "ID категории",
    category_title_ru: "Название категории(рус)",
    category_title_uz: "Название категории(узб)",
    sellers_count: "Количество продавцов",
    avg_rating: "Средний рейтинг",
    selled_per_for_period: "Кол-во продаж, шт.",
    avg_base_price: "Ср. Базовая цена,. UZS",
    revenue: "Выручка, UZS",
    revenue_base: "Базовая выручка, UZS",
    available_amount: "Остаток (в наличии), шт.",
    reviews_amount: "Кол-во отзывов",
    avg_product_rating: "Средний рейтинг",
    turnover: "Оборачиваемость, дней",
    days_with_remaining_product: "Дней в наличии",
    date_range: "Период времени",
    average_price: "Средняя цена, UZS",
    average_base_price: "Ср. базовая цена, UZS",
    predicted_revenue: "Прогнозируемая выручĸа, UZS",
    missed_revenue: "Упущенная выручĸа, UZS",
    missed_revenue_percent: "Доля упущенной выручĸи, %",
    available_amount_price: "Стоимость остатков, UZS",
    categories_count: "Количество категорий",
    available_sku: "Остатоĸ (в наличии), шт.",
    available_product: "Количество товаров, шт.",
    selled_amount: "Кол-во продаж, шт.",
    avg_revenue: "Средний доход, UZS",
    remaining_products_value: "Стоимость остатĸов (по теĸ. цене), UZS",
    avg_purchase_price: "Средняя цена, UZS",
    num_of_active_product: "Кол-во акт. товаров, шт.",
    num_of_active_seller: "Кол-во акт. продавцов",
    avg_product_selled_amount: "Ср. кол-во прод.товара, шт.",
    rating: "Рейтинг",
    num_of_active_category: "Кол-во активных категорий",
    avg_bill: "Средний чеĸ",
    orders_amount_per_day: "Количество заказов, шт.",
    link: "Ссылка на товар",
    characteristics: "Характеристики",
    sku_actual: "SKU",
    category_link: "Ссылка на категорию",
  };

  const renameObjUz = {
    photo: "Rasm",
    title: "Mahsulot nomi",
    sku: "SKU",
    product_id: "Mahsulot ID",
    seller_id: "Sotuvchi ID",
    seller_title: "Sotuvchi",
    actual_price: "Joriy narx, UZS",
    average_price: "O’rtacha narx",
    category_id: "Toifa ID",
    category_title_ru: "Toifa nomi (rus)",
    category_title_uz: "Toifa nomi (uzb)",
    sellers_count: "Sotuvchilar soni, dona",
    avg_base_price: "O’rtacha asosiy narx, UZS",
    selled_amount: "Sotuvlar soni, dona",
    selled_per_for_period: "Sotish soni, dona",
    revenue: "Daromad, UZS",
    revenue_base: "Asosiy daromad, UZS",
    available_amount: "Qoldiq (mavjud), dona",
    available_amount_price: "Qoldiqlar qiymati, UZS",
    reviews_amount: "Sharhlar soni",
    avg_rating: "O’rtacha reyting",
    avg_product_rating: "O’rtacha reyting",
    turnover: "Aylanma, kunlar",
    days_with_remaining_product: "Mavjud kunlar",
    predicted_revenue: "Kutilayotgan daromad, UZS",
    missed_revenue: "Yo`qotilgan daromad, UZS",
    missed_revenue_percent: "Yo`qotilgan daromadning ulushi, %",
    link: "Havola",
    num_of_active_seller: "Faol sotuvchilar soni",
    available_product: "Mahsulotlar soni, dona",
    num_of_active_product: "Faol mahsulotlar soni, dona",
    avg_product_selled_amount: "O’rtacha sotilgan mahsulotlar soni, dona",
    orders_amount_per_day: "Buyurtmalar soni, dona",
    avg_purchase_price: "O’rtacha narx, UZS",
    avg_revenue: "O’rtacha daromad, UZS",
    avg_bill: "O’rtacha chek",
    available_sku: "Qoldiq (mavjud), dona",
    remaining_products_value: "Qoldiqlar qiymati, UZS",
    rating: "O’rtacha reyting",
    num_of_active_category: "Faol toifalar soni",
    characteristics: "Xarakteristikalar",
    sku_actual: "SKU",
    category_link: "Havola",
  };

  return arr.map((item) => {
    if (langType === "uz") {
      return renameObjUz[item] ? renameObjUz[item] : item;
    } else {
      return renameObjRu[item] ? renameObjRu[item] : item;
    }
  });
}

function sortTableArray(arr, arrayType, tableType, deleteableProp) {
  let sortOrder;

  if (tableType === "analyze") {
    sortOrder = {
      characteristics: 1,
      available_product: 1,
      category_title_ru: 1,
      num_of_active_product: 2,
      category_title_uz: 2,
      category_id: 3,
      sellers_count: 4,
      num_of_active_seller: 5,
      available_product: 6,
      num_of_active_product: 7,
      selled_amount: 8,
      avg_product_selled_amount: 9,
      orders_amount_per_day: 10,
      avg_purchase_price: 11,
      avg_revenue: 12,
      revenue: 13,
      avg_bill: 14,
      available_sku: 15,
      remaining_products_value: 16,
      available_amount: 15,
      available_amount_price: 16,
      reviews_amount: 17,
      avg_rating: 18,
      num_of_active_category: 18,
    };
  } else {
    sortOrder = {
      photo: 1,
      title: 2,
      characteristics: 2,
      seller_title: 2,
      product_id: 3,
      sku: 4,
      actual_price: 5,
    };
  }

  const sortedArray = arr.sort((a, b) => {
    const aVal = sortOrder[a[0]] || 999;
    const bVal = sortOrder[b[0]] || 999;
    return aVal - bVal;
  });

  let index = arrayType === "header" ? 0 : 1;

  const result = [];

  sortedArray.forEach((item) => {
    if (!deleteableProp.includes(item[0])) {
      result.push(item[index]);
    }
  });

  return result;
}
