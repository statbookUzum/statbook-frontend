import axios from 'axios';
import { subtractDaysFromToday } from './helper';

export const getHelperData = (value, searchType) => {
  const urls = {
    shop: 'https://statbook.uz/server/get_seller/',
    category: 'https://statbook.uz/server/get_category?title=',
    product: 'https://statbook.uz/server/get_product?title='
  }
  const url = urls[searchType] + value;

  return axios.get(url);
};

export const getDataWithId = (id, searchType) => {
  const urls = {
    shop: 'https://statbook.uz/server/get_seller_view/',
    category: 'https://statbook.uz/server/get_category_view/',
    product: 'https://statbook.uz/server/get_product_analyze/'
  }

  const url = urls[searchType] + id;

  return axios.get(url);
}

// export const getCategoryDataWithId = (id) => {
//   const url = 'https://statbook.uz/server/get_category_view/' + id;

//   return axios.get(url);
// }

// export const getProductDataWithId = (id) => {
//   const url = 'https://statbook.uz/server/get_product_analyze/' + id;

//   return axios.get(url);
// }
