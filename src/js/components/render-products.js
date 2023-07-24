import { formatNumber } from "./helperTablePage/transformDataForTables";
import { removeYearFromDate } from "./helper";
import { changeLang } from "./change-lang";

const fixedNum = (str) => {
  if (str.includes(".")) {
    return str.slice(0, str.indexOf(".") + 2);
  }
};

export function renderProductCard(data, element, breadcrumbs) {
  const {
    title,
    avg_purchase_price,
    seller_title,
    photo,
    rating,
    reviews_amount,
    actual_purchase_price,
    remaining_product,
  } = data;

  element.innerHTML = `
  <div class="product-info__image">
  <img src="${photo ? photo : "/img/seller-card-default.svg"}"
    alt="${title}">
  </div>
  <div class="product-info__breadcrumbs">
  ${Object.values(breadcrumbs)
    .map((item, index, items) => {
      return `<div>${
        index + 1 !== items.length
          ? item.category_title + "/"
          : item.category_title
      }</div>`;
    })
    .join(" ")}
  </div>
  <div class="product-info__title">
    ${title}
  </div>
  <div class="product-info__reviews">
        <span class="product-info__reviews-score">${fixedNum(
          rating
        )}</span> (<span class="product-info__reviews-count">${fixedNum(
    reviews_amount
  )} </span> ${changeLang("отзывов")})
      </div>
  <div class="product-info__price">
    ${changeLang(
      "Цена"
    )}: <span class="product-info__price-amount">${formatNumber(
    (+actual_purchase_price).toFixed(0)
  )}</span> <span
      class="product-info__price-currency">${changeLang("сум")}</span>
  </div>
  <div class="product-info__seller">
    ${changeLang(
      "Продавец"
    )}: <span class="product-info__seller-name">${seller_title}</span>
  </div>
  <div class="product-info__price-avg">
  ${changeLang(
    "Ср. цена продаж"
  )}: <span class="product-info__price-avg-amount">${formatNumber(
    (+avg_purchase_price).toFixed(0)
  )}</span> <span
      class="product-info__price-currency">${changeLang("сум")}</span>
  </div>
  <div class="product-info__lost">
    ${changeLang(
      "Остаток (в наличии)"
    )}: <span class="product-info__lost-count">${remaining_product} ${changeLang(
    "шт."
  )}</span>
  </div>
  <div class="product-info__description">
  </div>
`;
}

export function renderTotalStat(data, elements) {
  const { revenue, selled_amount, date_range } = data;

  elements.forEach((element) => {
    if (element.matches("[data-total-sale]")) {
      element.textContent = +selled_amount < 0 ? 0 : selled_amount;
    }

    if (element.matches("[data-total-profit]")) {
      element.innerHTML = +revenue < 0 ? 0 : formatNumber((+revenue).toFixed());
    }

    if (element.matches("[data-total-average]")) {
      element.textContent =
        +selled_amount < 0 ? 0 : (+selled_amount / +date_range).toFixed(2);
    }
  });
}

export function renderCategory(data, element) {
  element.innerHTML = "";

  for (let category in data) {
    if (category == "1") continue;

    const dataArray = Object.entries(data[category].data);
    dataArray.sort((a, b) => {
      const dateA = new Date(a[0]).getTime();
      const dateB = new Date(b[0]).getTime();

      return dateA - dateB;
    });

    const spinnerSvg = `
      <div class="analytics-line__spinner" title="Данные вычисляются">
      <svg height="64px" width="64px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="1.024"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:#000000;} </style> <g> <path class="st0" d="M256,0c-23.357,0-42.297,18.932-42.297,42.288c0,23.358,18.94,42.288,42.297,42.288 c23.357,0,42.279-18.93,42.279-42.288C298.279,18.932,279.357,0,256,0z"></path> <path class="st0" d="M256,427.424c-23.357,0-42.297,18.931-42.297,42.288C213.703,493.07,232.643,512,256,512 c23.357,0,42.279-18.93,42.279-42.288C298.279,446.355,279.357,427.424,256,427.424z"></path> <path class="st0" d="M74.974,74.983c-16.52,16.511-16.52,43.286,0,59.806c16.52,16.52,43.287,16.52,59.806,0 c16.52-16.511,16.52-43.286,0-59.806C118.261,58.463,91.494,58.463,74.974,74.983z"></path> <path class="st0" d="M377.203,377.211c-16.503,16.52-16.503,43.296,0,59.815c16.519,16.52,43.304,16.52,59.806,0 c16.52-16.51,16.52-43.295,0-59.815C420.489,360.692,393.722,360.7,377.203,377.211z"></path> <path class="st0" d="M84.567,256c0.018-23.348-18.922-42.279-42.279-42.279c-23.357-0.009-42.297,18.932-42.279,42.288 c-0.018,23.348,18.904,42.279,42.279,42.279C65.645,298.288,84.567,279.358,84.567,256z"></path> <path class="st0" d="M469.712,213.712c-23.357,0-42.279,18.941-42.297,42.288c0,23.358,18.94,42.288,42.297,42.297 c23.357,0,42.297-18.94,42.279-42.297C512.009,232.652,493.069,213.712,469.712,213.712z"></path> <path class="st0" d="M74.991,377.22c-16.519,16.511-16.519,43.296,0,59.806c16.503,16.52,43.27,16.52,59.789,0 c16.52-16.519,16.52-43.295,0-59.815C118.278,360.692,91.511,360.692,74.991,377.22z"></path> <path class="st0" d="M437.026,134.798c16.52-16.52,16.52-43.304,0-59.824c-16.519-16.511-43.304-16.52-59.823,0 c-16.52,16.52-16.503,43.295,0,59.815C393.722,151.309,420.507,151.309,437.026,134.798z"></path> </g> </g></svg>
      </div>
      `;

    let totalProfit =
      dataArray.length &&
      +dataArray[0][1].positionNumber <=
        +dataArray[dataArray.length - 1][1].positionNumber
        ? "analytics-line__positions--down"
        : "";

    element.innerHTML += `
    <div class="category-analytics__line analytics-line">
    <div class="analytics-line__top">
      <div class="analytics-line__title">
        <div class="analytics-line__title-text">
          Категория - ${data[category].category_title}.
        </div>
      </div>
      <div class="analytics-line__positions ${totalProfit}" style="display: ${
      String(data[category].data) == "101" ? "none" : "block"
    }"></div>
    </div>
    <div class="analytics-line__content" data-simplebar>
      <ul class="analytics-line__list">
      ${
        String(data[category].data) == "101"
          ? "К сожалению, информация по данной категории отсутствует."
          : dataArray
              .map((item) => {
                const positionStyle =
                  item[1].delta >= 0
                    ? "analytics-line__item-profit--up"
                    : "analytics-line__item-profit--down";

                return `
          <li class="analytics-line__item">
            <div class="analytics-line__item-number">
              ${
                item[1].positionNumber == "101"
                  ? "99+"
                  : item[1].positionNumber == "-1"
                  ? spinnerSvg
                  : item[1].positionNumber
              }
            </div>
            <div class="analytics-line__item-profit ${positionStyle}">
            <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
            <svg width="17px" height="17px" viewBox="0 0 24 24" fill=${
              item[1].delta >= 0 ? "#32af99" : "#c24141"
            } style="transform: rotate(${
                  item[1].delta >= 0 ? "0" : "-180deg"
                }); display: ${
                  item[1].delta === 0 ? "none" : "block"
                }" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C12.2652 3 12.5196 3.10536 12.7071 3.29289L19.7071 10.2929C20.0976 10.6834 20.0976 11.3166 19.7071 11.7071C19.3166 12.0976 18.6834 12.0976 18.2929 11.7071L13 6.41421V20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V6.41421L5.70711 11.7071C5.31658 12.0976 4.68342 12.0976 4.29289 11.7071C3.90237 11.3166 3.90237 10.6834 4.29289 10.2929L11.2929 3.29289C11.4804 3.10536 11.7348 3 12 3Z"/>
            </svg>
            </div>
            <div class="analytics-line__item-date">
              ${removeYearFromDate(item[0])}
            </div>
          </li>
        `;
              })
              .join(" ")
      }
      </ul>
    </div>
  </div>
    `;
  }
}
