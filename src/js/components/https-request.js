import axios from "axios";

export const getHelperData = (value, searchType) => {
  const urls = {
    shop: "https://statbook.uz/server/get_seller?title=",
    category: "https://statbook.uz/server/get_category?title=",
    product: "https://statbook.uz/server/get_product?title=",
  };
  const url = urls[searchType] + value;

  return axios.get(url);
};

export const getDataWithId = (id, searchType, period) => {
  const urls = {
    shop: "https://statbook.uz/server/get_seller_view/",
    category: "https://statbook.uz/server/get_category_view/",
    product: "https://statbook.uz/server/get_product_analyze_by_sku/",
  };

  const url = urls[searchType] + id + `${period ? "?range=" + period : ""}`;

  console.log(url);

  return axios.get(url);
};
