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
    // тут в идеале "хлебные крошки" одной строкой было бы получать, но если там будет какой-то условно массив, то это тоже не проблема, по массиву пробежаться можно и сформировать нужную html-структуру, но пока оставил просто с одной строкой =)
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
    tableData: [
      ['Категория', 'Продажи', 'Выручка в сред.', 'Выручка', 'Остатки', 'Стоимость остатоков'],
      ['Мягкие игрушки', '542500 шт.', '800 млрд.', '600 млрд.', '6504566 шт.', '256 млрд.'],
      ['Мягкие игрушки', '542500 шт.', '800 млрд.', '600 млрд.', '6504566 шт.', '256 млрд.'],
      ['Мягкие игрушки', '542500 шт.', '800 млрд.', '600 млрд.', '6504566 шт.', '256 млрд.'],
      ['Мягкие игрушки', '542500 шт.', '800 млрд.', '600 млрд.', '6504566 шт.', '256 млрд.'],
      ['Мягкие игрушки', '542500 шт.', '800 млрд.', '600 млрд.', '6504566 шт.', '256 млрд.'],
    ]
  }


  const table = categoryPage.querySelector('.table');
  const totalStat = categoryPage.querySelector('.report-statistic__list');
  const categoryName = categoryPage.querySelector('.shop-report__category-title')
  const breadcrumbs = categoryPage.querySelector('.shop-report__breadcrumbs');

  categoryName.textContent = categoryData.categoryName;
  renderBreadcrumbs(categoryData.breadcrumbs, breadcrumbs);
  renderTotalStat(categoryData.totalStat, totalStat)
  renderTable(categoryData.tableData, table);
}

if (shopPage) {

}



function renderTotalStat(data, element) {
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

  setHeight();
}

function renderTable(data, element) {
  element.innerHTML = `
                        <tr class="table__header">
                          ${data[0].map(el => `<th>${el}</th>`)}
                        </tr>
                        ${data.map((arr, i) => i !== 0 ? `<tr>${arr.map(el => `<td>${el}</td>`)}</tr>` : null)}
                        `;

  setHeight();
}

function renderBreadcrumbs(data, element) {
  element.innerHTML = '';

  data.forEach(item => {
    element.innerHTML += `<li class="shop-report__breadcrumbs-item">${item}</li>`;
  });
}
