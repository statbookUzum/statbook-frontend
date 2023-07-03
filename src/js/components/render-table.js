import { typeOfLang } from "./vars";
import { setHeight } from "./helper";
import { transformTableItem } from "./helperTablePage/transformDataForTables";
import { changeLang } from "./change-lang";

export function renderBreadcrumbs(data, element) {
  element.innerHTML = "";

  if (!data) return;

  data.forEach((item) => {
    element.innerHTML += `<li class="shop-report__breadcrumbs-item">${item}</li>`;
  });
}

export function renderTotalStat(data, element) {
  element.innerHTML = "";

  data.forEach((item) => {
    element.innerHTML += `
    <li class="report-statistic__item">
      <div class="report-statistic__title">
        ${changeLang(item.title)}
      </div>
      <span class="report-statistic__value">
        ${transformTableItem(item.value)}
      </span>
    </li>
    `;
  });
}

export function renderTable(tables, elements) {
  elements.forEach((element) => {
    let data;

    if (element.hasAttribute("data-table-analytic")) {
      data = tables.analyze;
    }

    if (element.hasAttribute("data-table-review")) {
      data = tables.review;
    }

    const imageLinkRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
    let indexOfImg = -1;
    let indexOfTitle = -1;
    let indexOfTitleAnalyze = -1;
    let titleWidth = 114;
    let indexLink = -1;
    const stickyTableElem =
      typeOfLang === "ru"
        ? { ru: "название категории(рус)", uz: "toifa nomi (rus)" }
        : { ru: "название категории(узб)", uz: "toifa nomi (uzb)" };
    const arrRowTableEl = [];
    const arrHeaderTableEl = data[0].map((el, i) => {
      if (el.toLowerCase() === "изображение" || el.toLowerCase() === "rasm") {
        indexOfImg = i;
        return `<th class="sticky">${el}</th>`;
      }

      if (
        el.toLowerCase() === stickyTableElem.ru ||
        el.toLowerCase() === stickyTableElem.uz
      ) {
        indexOfTitleAnalyze = i;
        titleWidth = 0;
        return `<th class="sticky">${el}</th>`;
      }

      if (el.toLowerCase() === "название товара") {
        indexOfTitle = i;
        titleWidth = 114;
        return `<th class="sticky" style="left: ${titleWidth}px; text-align: left;">
              ${el}
      </th>`;
      }

      if (el.toLowerCase() === "mahsulot nomi") {
        indexOfTitle = i;
        titleWidth = 55;
        return `<th class="sticky" style="left: ${titleWidth}px; text-align: left;">
              ${el}
      </th>`;
      }

      if (
        el.toLowerCase() === "ссылка на товар" ||
        el.toLowerCase() === "havola"
      ) {
        indexLink = i;
        return `<th>${el}</th>`;
      }

      if (
        el.toLowerCase() === "id товара" ||
        el.toLowerCase() === "id категории" ||
        el.toLowerCase() === "sku" ||
        el.toLowerCase() === "продавец" ||
        el.toLowerCase() === "mahsulot id" ||
        el.toLowerCase() === "sotuvchi" ||
        el.toLowerCase() === "toifa id" ||
        el.toLowerCase() === "характеристики" ||
        el.toLowerCase() === "xarakteristikalar"
      ) {
        return `<th>${el}</th>`;
      }

      return `<th>
      <button class="table__filter-button btn-reset" data-index-sort="${i}" data-table-type="${
        element.hasAttribute("data-table-analytic") ? "analyze" : "review"
      }" data-filter-type="less">
        ${el}
      </button>
    </th>`;
    });

    for (let i = 0; i < data.length; i++) {
      if (i > 300) break;

      if (i !== 0) {
        arrRowTableEl.push(
          `<tr>${data[i]
            .map((el, index) => {
              if (imageLinkRegex.test(el) || index === indexOfImg) {
                const img =
                  el === "" || String(el) === "null" ? "img/no-image.svg" : el;

                return `<td class="sticky" style="left: 0"><img loading="lazy" class="table-img" src="${img}" alt="${
                  data[i][index + 1]
                }"></td>`;
              }

              if (index === indexOfTitle) {
                const title =
                  String(el) !== "null"
                    ? el
                    : changeLang("Данные обрабатываются");
                return `<td class="sticky sticky--border" style="left: ${titleWidth}px; text-align: left;"><span class="sticky__border">${title}</span></td>`;
              }

              if (index === indexOfTitleAnalyze) {
                const title =
                  String(el) !== "null"
                    ? el
                    : changeLang("Данные обрабатываются");
                return `<td class="sticky sticky--border" style="left: ${titleWidth}px; text-align: center;"><span class="sticky__border">${title}</span></td>`;
              }

              if (index === indexLink) {
                return `
              <td><span data-link="${el}" class="table__link">${changeLang(
                  "Ссылка на продукт"
                )}</span></td>
              `;
              }

              return `<td>${transformTableItem(el)}</td>`;
            })
            .join(" ")}</tr>`
        );
      }
    }

    element.innerHTML = `
                        <tr class="table__header">
                          ${arrHeaderTableEl.join(" ")}
                        </tr>
                        ${arrRowTableEl.join(" ")}
                        `;
  });

  setTimeout(setHeight, 100);
}

export function renderSellerCard(data, elements) {
  const { title, rating, registration_date, reviews_amount, description } =
    data;
  const dateObj = new Date(registration_date);

  const day = dateObj.getDate();
  const month = dateObj.getMonth();
  const year = dateObj.getFullYear();

  const monthNamesGenitive =
    typeOfLang === "ru"
      ? [
          "января",
          "февраля",
          "марта",
          "апреля",
          "мая",
          "июня",
          "июля",
          "августа",
          "сентября",
          "октября",
          "ноября",
          "декабря",
        ]
      : [
          "yanvar",
          "fevral",
          "mart",
          "aprel",
          "may",
          "iyun",
          "iyul",
          "avgust",
          "sentyabr",
          "oktyabr",
          "noyabr",
          "dekabr",
        ];

  elements.forEach((element) => {
    element.innerHTML = `
    <div class="seller-card__image">
      <img src="/img/seller-card-default.svg" alt="${title}">
    </div>
    <div class="seller-card__info">
      <div class="seller-card__info-top">
        <h2 class="seller-card__title">
          ${title}
        </h2>
      <div class="seller-card__reviews">
        <span class="seller-card__reviews-score">${rating}</span> (<span
          class="seller-card__reviews-count">${reviews_amount} </span> ${changeLang(
      "отзывов"
    )})
      </div>
    </div>
    <div class="seller-card__start">
    ${
      typeOfLang === "ru"
        ? `Продавец на UZUM с <span>${day} ${monthNamesGenitive[month]} ${year} года</span>`
        : `<span>${year} yilning ${day} ${monthNamesGenitive[month]} dan Uzumda sotuvchi</span>`
    }
    </div>
    <div class="seller-card__desc">
      ${description}
    </div>

    <div class="seller-card__desc-full">
      ${description}
    </div>
    `;
  });
}
