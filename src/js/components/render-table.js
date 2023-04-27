import { setHeight } from './helper';

// примечания для бэка
// тут получаем 2 страницы на которых могут быть таблицы

const categoryPage = document.querySelector('.main-section--category');
const shopPage = document.querySelector('.main-section--shop');

// проверяем находимся ли мы на странице категорий
if (categoryPage) {
  // пример обьекта с данными
  const categoryData = {
    categoryName: 'Мягкие игрушки',
    breadcrumbs: [
      'Главная',
      'Все категории',
      'Детские товары',
      'Игрушки и игры',
      'Мягкие игрушка',
    ],
    totalStat: [
      {
        title: 'Заказы',
        value: '54550'
      },
      {
        title: 'Выручка',
        value: '540 млрд сум' // ну и было бы хорошо, если бы значиние проходили уже с млнб млрд и тд
      },
      {
        title: 'Количество позиций',
        value: '540765'
      },
      {
        title: 'Коэффициент популярности',
        value: '89%'
      },
      {
        title: 'Количество подкатегорий',
        value: '10'
      },
    ],
    tables: {
      tableAnalyticData: [
        ['Категория', 'Продажи', 'Выручка в сред.', 'Выручка', 'Остатки', 'Стоимость остатоков'],
        ['Мягкие игрушки', '542500 шт.', '800 млрд.', '600 млрд.', '6504566 шт.', '256 млрд.'],
        ['Мягкие игрушки', '542500 шт.', '800 млрд.', '600 млрд.', '6504566 шт.', '256 млрд.'],
        ['Мягкие игрушки', '542500 шт.', '800 млрд.', '600 млрд.', '6504566 шт.', '256 млрд.'],
        ['Мягкие игрушки', '542500 шт.', '800 млрд.', '600 млрд.', '6504566 шт.', '256 млрд.'],
        ['Мягкие игрушки', '542500 шт.', '800 млрд.', '600 млрд.', '6504566 шт.', '256 млрд.'],
      ],
      tableReviewData: [
        ['Изображение', 'Продукт', 'SKU', 'Категория', 'Остаток', 'Дней в наличии', 'Заказы', 'Выручка'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
      ],
    }
  }


  const tableList = categoryPage.querySelectorAll('.table');
  const totalStatSlit = categoryPage.querySelectorAll('[data-total]');
  const categoryNameList = categoryPage.querySelectorAll('[data-title]')
  const breadcrumbsList = categoryPage.querySelectorAll('[data-breadcrumbs]');

  categoryNameList.forEach(categoryName => {
    categoryName.textContent = categoryData.categoryName;
  });

  renderBreadcrumbs(categoryData.breadcrumbs, breadcrumbsList);
  renderTotalStat(categoryData.totalStat, totalStatSlit)
  renderTable(categoryData.tables, tableList);
}

if (shopPage) {
  const shopData = {
    cardInfo: {
      shopName: 'Top Seller',
      stars: '4.5',
      reviewsAmount: 480,
      startTime: '1 декабря 2022 года', // здесь можно дату обьектом передавать
      description: 'Магазин по продаже компьютерной техники',
      shopImage: '',
    },
    totalStat: [
      {
        title: 'Количество продуктов',
        value: '54550'
      },
      {
        title: 'Количество категорий',
        value: '34'
      },
      {
        title: 'Средняя цена',
        value: '7.4 млн'
      },
      {
        title: 'Общая выручка',
        value: '540 млрд'
      },
    ],

    tables: {
      tableAnalyticData: [
        ['Изображение', 'Продукт', 'SKU', 'Категория', 'Остаток', 'Дней в наличии', 'Заказы', 'Выручка'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', '256', '8 млн'],
      ],
      tableReviewData: [
        ['Изображение', 'Продукт', 'SKU', 'Категория', 'Остаток', 'Дней в наличии', 'АBC Заказы', 'ABC Выручка'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', 'A', 'A'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', 'A', 'A'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', 'A', 'A'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', 'A', 'A'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', 'A', 'A'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', 'A', 'A'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', 'A', 'A'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', 'A', 'A'],
        ['./img/test-table-img.jpg', '54880', '54250', 'Детские товары', '0 шт.', '51', 'A', 'A'],
      ],
    }
  }

  const tableList = shopPage.querySelectorAll('.table');
  const totalStatSlit = shopPage.querySelectorAll('[data-total]');
  const sellerCard = shopPage.querySelectorAll('[data-seller-card');

  renderSellerCard(shopData.cardInfo, sellerCard);
  renderTotalStat(shopData.totalStat, totalStatSlit);
  renderTable(shopData.tables, tableList);
}

function renderBreadcrumbs(data, elements) {
  elements.forEach(element => {
    element.innerHTML = '';

    data.forEach(item => {
      element.innerHTML += `<li class="shop-report__breadcrumbs-item">${item}</li>`;
    });
  });
}

function renderTotalStat(data, elements) {
  elements.forEach(element => {
    element.innerHTML = '';

    data.forEach(item => {
      element.innerHTML += `
    <li class="report-statistic__item">
      <div class="report-statistic__title">
        ${item.title}
      </div>
      <span class="report-statistic__value">
        ${item.value}
      </span>
    </li>
    `
    });
  });
}

function renderTable(tables, elements) {
  elements.forEach(element => {
    let data;

    if (element.hasAttribute('data-table-analytic')) {
      data = tables.tableAnalyticData;
    }

    if (element.hasAttribute('data-table-review')) {
      data = tables.tableReviewData;
    }

    const imageLinkRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;

    element.innerHTML = `
                        <tr class="table__header">
                          ${data[0].map(el => {
      if (el.toLowerCase() === 'категория' || el.toLowerCase() === 'остаток') {
        return `<th>
                                <button class="table__filter-button btn-reset">
                                  ${el}
                                </button>
                              </th>`
      }

      return `<th>${el}</th>`
    }).join(' ')}
                        </tr>
                        ${data.map((arr, i) => {
      if (i !== 0) {
        return `<tr>${arr.map((el, i) => {
          if (imageLinkRegex.test(el)) {
            return `<td><img src="${el}" alt="${arr[i + 1]}"></td>`
          }

          return `<td>${el}</td>`
        }).join(' ')}</tr>`
      }
    }).join(' ')}
                        `;
  });

  setHeight();
}

function renderSellerCard(data, elements) {
  const { shopName, stars, reviewsAmount, startTime, description, shopImage } = data;

  elements.forEach(element => {
    element.innerHTML = `
    <div class="seller-card__image">
      <img src="${shopImage ? shopImage : './img/seller-card-default.svg'}" alt="Top Seller">
    </div>
    <div class="seller-card__info">
      <div class="seller-card__info-top">
        <h2 class="seller-card__title">
          ${shopName}
        </h2>
      <div class="seller-card__reviews">
        <span class="seller-card__reviews-score">${stars}</span> (<span
          class="seller-card__reviews-count">${reviewsAmount} </span> отзывов)
      </div>
    </div>
    <div class="seller-card__start">
      Продавец на UZUM с <span>${startTime}</span>
    </div>
    <div class="seller-card__desc">
      ${description}
    </div>
    `;
  });
}
