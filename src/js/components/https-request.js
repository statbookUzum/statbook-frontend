import axios from "axios";

const API_KEY = "0ZYxQBopRkTaem15";

// export const getCategorySelectData = () => {
//   return axios.get("https://statbook.uz/public/uploads/menu.json");
// };

export const getHelperData = (value, searchType) => {
  const urls = {
    shop: "https://statbook.uz/server/get_seller?title=",
    category: "https://statbook.uz/server/get_category?title=",
    product: "https://statbook.uz/server/get_product?title=",
  };
  const url = urls[searchType] + value;

  return axios.get(url, {
    headers: {
      "api-key": API_KEY,
    },
  });
};

export const getDataWithId = (id, searchType, period) => {
  const urls = {
    shop: "https://statbook.uz/server/get_seller_view/",
    category: "https://statbook.uz/server/get_category_view/",
    product: "https://statbook.uz/server/get_product_analyze_by_sku/",
  };

  const url = urls[searchType] + id + `${period ? "?range=" + period : ""}`;

  return axios.get(url, {
    headers: {
      "api-key": API_KEY,
    },
  });
};
