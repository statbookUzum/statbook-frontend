import axios from 'axios';
import { subtractDaysFromToday } from './helper';

export const getHelperData = (value, searchType) => {
  const urls = {
    shop: 'https://statbook.uz/server/get_seller/',
    category: 'https://statbook.uz/server/get_category?title='
  }
  const url = urls[searchType] + value;

  return axios.get(url);
};

export const getDataWithId = (id, days = 15, flag) => {
  const urls = {
    shop: {
      url: 'http://158.160.24.64:84/api/seller/seller_review.php',
      idType: 'sellerId',
    },
    category: {
      url: 'http://158.160.24.64:84/api/category/category_review.php',
      idType: 'categoryId'
    }
  }


  const headers = { 'Content-Type': 'multipart/form-data' };
  const data = new FormData();
  data.append(urls[`${flag}`].idType, id);
  data.append('startDate', subtractDaysFromToday(days));
  data.append('endDate', subtractDaysFromToday(0));

  return request(urls[`${flag}`].url, data, headers);
}
