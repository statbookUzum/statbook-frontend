import { getProductSkuFromString } from "../helper";
import { setSkuStr, getSkuNumber } from "./changeSku";

export function renderSkuFilter(data, searchInput, skuContainer) {
  skuContainer.classList.add("active");
  const { chartsInfo: chartsArr, analyze } = data;
  const obj = setSkuProductObj(chartsArr, searchInput);
  const currentChars = transformCharsData(obj);
  setSkuStr(currentChars);
  getSkuNumber(obj);

  const skuFilterContainer = skuContainer.querySelector(".filter-sku__content");
  skuFilterContainer.innerHTML = currentChars
    .map((item) => {
      return `
    <div class="filter-sku__section ${
      item.name === "Цвет"
        ? "filter-sku__section--img"
        : "filter-sku__section--text"
    }" data-value="${item.name}">
      <div class="filter-sku__section-title">
        ${item.name}: <span class="filter-sku__section-value"></span>
      </div>
      <div class="filter-sku__list">
        ${Object.values(item.values)
          .map((valueObj) => {
            const { value, active } = valueObj;

            return `
            <label class="filter-sku__label" title="${value}">
            <input class="filter-sku__input" type="radio" name="${
              item.name
            }" value="${value}" style="opacity: ${
              item.name === "Цвет" ? "0" : "1"
            }" ${active ? "checked" : ""}>
            <div class="filter-sku__item">
              ${
                item.name === "Цвет"
                  ? `<img src="${
                      analyze.find((item) =>
                        item.characteristics.includes(value)
                      )?.photo
                    }" alt="${value}">`
                  : ""
              }
              <div class="filter-sku__item-value" style="display: ${
                item.name === "Цвет" ? "none" : "block"
              }">${value}</div>
            </div>
            </label>
            `;
          })
          .join("")}
      </div>
    </div>
    `;
    })
    .join("");
}

function transformCharsData(obj) {
  const currentChars = [];
  Object.values(obj).forEach((item) => {
    let activeItem = false;

    if (item.includes("active")) {
      item = item.replace(";active", "");
      activeItem = true;
    }

    const charArr = item.split(";");

    charArr.forEach((charStr, i) => {
      const char = charStr.split(":");
      const currentValue = char[1];

      if (!currentChars[i]) {
        currentChars[i] = {
          name: char[0],
          values: {},
        };

        currentChars[i].values[currentValue] = {
          value: currentValue,
          active: activeItem,
        };
      } else {
        if (!currentChars[i].values[currentValue]) {
          currentChars[i].values[currentValue] = {
            value: currentValue,
            active: activeItem,
          };
        } else if (activeItem) {
          currentChars[i].values[currentValue].active = true;
        }
      }
    });
  });

  return currentChars;
}

function setSkuProductObj(chartsArr, searchInput) {
  const obj = {};

  chartsArr.forEach((item) => {
    if (!obj[item.sku] && item.characteristics) {
      obj[item.sku] = item.characteristics;
    }
  });

  const productSku = getProductSkuFromString(searchInput.value);
  if (productSku && obj[productSku]) {
    obj[productSku] = obj[productSku].trim() + ";active";
  }

  return obj;
}
