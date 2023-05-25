import { setHeight } from './helper';
import { transformTableItem } from './helperTablePage/_transformDataForTables';

export function renderBreadcrumbs(data, element) {

  element.innerHTML = '';

  data.forEach(item => {
    element.innerHTML += `<li class="shop-report__breadcrumbs-item">${item}</li>`;
  });
}

export function renderTotalStat(data, element) {
  element.innerHTML = '';

  data.forEach(item => {
    element.innerHTML += `
    <li class="report-statistic__item">
      <div class="report-statistic__title">
        ${item.title}
      </div>
      <span class="report-statistic__value">
        ${transformTableItem(item.value)}
      </span>
    </li>
    `
  });
}

export function renderTable(tables, elements) {
  elements.forEach(element => {
    let data;

    if (element.hasAttribute('data-table-analytic')) {
      data = tables.analyze;
    }

    if (element.hasAttribute('data-table-review')) {
      data = tables.review;
    }

    const imageLinkRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
    let indexOfImg = -1;
    let indexOfTitle = -1;
    let indexLink = -1;
    const arrRowTableEl = [];
    const arrHeaderTableEl = data[0].map((el, i) => {
      if (el.toLowerCase() === 'изображение') {
        indexOfImg = i;
        return `<th class="sticky">${el}</th>`
      }

      if (el.toLowerCase() === 'название товара') {
        indexOfTitle = i;
        return `<th class="sticky" style="left: 114px;">
              ${el}
      </th>`
      }

      if (el.toLowerCase() === 'ссылка на товар') {
        indexLink = i;
        return `<th>${el}</th>`
      }

      if (el.toLowerCase() === 'id товара' || el.toLowerCase() === 'sku' || el.toLowerCase() === 'продавец') {
        return `<th>${el}</th>`
      }

      return `<th>
      <button class="table__filter-button btn-reset" data-index-sort="${i}" data-table-type="${element.hasAttribute('data-table-analytic') ? 'analyze' : 'review'}" data-filter-type="less">
        ${el}
      </button>
    </th>`
    })

    for (let i = 0; i < data.length; i++) {
      if (i > 300) break;

      if (i !== 0) {
        arrRowTableEl.push(
          `<tr>${data[i].map((el, index) => {
            if (imageLinkRegex.test(el) || index === indexOfImg) {
              const img = el === '' || String(el) === 'null' ? 'img/no-image.svg' : el;

              return `<td class="sticky" style="left: 0"><img loading="lazy" class="table-img" src="${img}" alt="${data[i][index + 1]}"></td>`
            }

            if (index === indexOfTitle) {
              const title = String(el) !== 'null' ? el : 'Данные обрабатываются';
              return `<td class="sticky sticky--border" style="left: 114px; text-align: left;"><span class="sticky__border">${title}</span></td>`
            }

            if (index === indexLink) {
              return `
              <td><span data-link="${el}" class="table__link">Ссылка на продукт</span></td>
              `
            }

            return `<td>${transformTableItem(el)}</td>`
          }).join(' ')}</tr>`
        )
      }
    }



    element.innerHTML = `
                        <tr class="table__header">
                          ${arrHeaderTableEl.join(' ')}
                        </tr>
                        ${arrRowTableEl.join(' ')}
                        `;
  });

  setTimeout(setHeight, 100);
}

export function renderSellerCard(data, elements) {
  const { title, rating, registration_date, reviews_amount, description } = data;
  const dateObj = new Date(registration_date);

  const day = dateObj.getDate();
  const month = dateObj.getMonth();
  const year = dateObj.getFullYear();

  const monthNamesGenitive = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"
  ];

  elements.forEach(element => {
    element.innerHTML = `
    <div class="seller-card__image">
      <img src="./img/seller-card-default.svg" alt="Top Seller">
    </div>
    <div class="seller-card__info">
      <div class="seller-card__info-top">
        <h2 class="seller-card__title">
          ${title}
        </h2>
      <div class="seller-card__reviews">
        <span class="seller-card__reviews-score">${rating}</span> (<span
          class="seller-card__reviews-count">${reviews_amount} </span> отзывов)
      </div>
    </div>
    <div class="seller-card__start">
      Продавец на UZUM с <span>${day} ${monthNamesGenitive[month]} ${year} года</span>
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
