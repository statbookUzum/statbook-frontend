export function getSkuChartsData(data, productSku) {
  return data.filter((item) => item.sku === productSku);
}

export function getProductCardDataSku(data, productSku) {
  const currentData = data.find((item) => item.sku === productSku);
  currentData.seller_title = data[0].seller_title;

  return currentData;
}
