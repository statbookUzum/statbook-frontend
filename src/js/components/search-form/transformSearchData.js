export function transformCategoryData(response) {
  const responseObj = {
    helperList: [],
    breadcrumbs: {},
  };

  for (let i = 0; i < 30; i++) {
    if (!response.data[i]) break;

    const { category_id, title_ru, title_uz, parents_items } = response.data[i];

    responseObj.helperList.push({ category_id, title_ru, title_uz });
    responseObj.breadcrumbs[category_id] = parents_items;
  }

  return responseObj;
}

export function transformShopData(response) {
  const helperList = [];

  for (let i = 0; i < 30; i++) {
    if (!response.data[i]) break;

    const { seller_id, title, registration_date } = response.data[i];

    helperList.push({ seller_id, title, registration_date });
  }

  return helperList;
}

export function transformProductData(response) {
  const helperList = [];

  for (let i = 0; i < 30; i++) {
    if (!response.data[i]) break;

    const { product_id, title } = response.data[i];

    helperList.push({ product_id, title });
  }

  return helperList;
}
