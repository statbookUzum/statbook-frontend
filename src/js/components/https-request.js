import axios from 'axios';
import { subtractDaysFromToday } from './helper';

const request = (url, data, headers) => {
  return axios.post(url, data, { headers })
}

export const getShopHelperList = (value) => {
  const url = 'http://158.160.24.64:84/api/seller/seller_name_by_fragment.php';
  const headers = { 'Content-Type': 'multipart/form-data' };
  const data = new FormData();
  data.append('sellerNameFragment', value);

  return request(url, data, headers);
};

export const getShopDataWithId = (id) => {
  const url = 'http://158.160.24.64:84/api/seller/seller_review.php';
  const headers = { 'Content-Type': 'multipart/form-data' };
  const data = new FormData();
  data.append('sellerId', id);
  data.append('startDate', subtractDaysFromToday(15));
  data.append('endDate', subtractDaysFromToday(0));

  return request(url, data, headers);
}
