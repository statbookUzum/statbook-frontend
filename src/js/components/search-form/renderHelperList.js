const helperList = document.querySelector('.search-form__helper-list');

export function renderCategoryList(arr) {
  helperList.innerHTML = '';

  if (!arr) {
    helperList.innerHTML = 'Произошила ошибка, повторите запрос позже';

    return;
  }

  if (arr.length === 0) {
    helperList.innerHTML = `
      <div class="search-form__helper-item" role="button">
        <span>
          Данных категорий не найдено.
        </span>
      </div>
    `;

    return;
  }

  for (let i = 0; i < arr.length; i++) {
    const { category_id, title_ru, title_uz } = arr[i];

    helperList.innerHTML += `
      <div class="search-form__helper-item search-form-request" role="button" tabindex="0" data-id="${category_id}">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M16.9697 16.9697C17.2626 16.6768 17.7374 16.6768 18.0303 16.9697L22.0303 20.9697C22.3232 21.2626 22.3232 21.7374 22.0303 22.0303C21.7374 22.3232 21.2626 22.3232 20.9697 22.0303L16.9697 18.0303C16.6768 17.7374 16.6768 17.2626 16.9697 16.9697Z"
          fill="rgba(4, 15, 35, 0.3)" />
        <path
          d="M20 11C20 15.9706 15.9706 20 11 20C6.02944 20 2 15.9706 2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11Z"
          stroke="rgba(4, 15, 35, 0.3)" stroke-width="1.5" stroke-linecap="round" />
      </svg>
        ${title_ru ? title_ru : title_uz}
      </div>
      `;
  }
}

export function renderShopList(arr) {
  console.log(arr);
  helperList.innerHTML = '';

  if (!arr) {
    helperList.innerHTML = 'Произошила ошибка, повторите запрос позже';
  }

  if (arr.length === 0) {
    helperList.innerHTML = `
      <div class="search-form__helper-item" role="button">
        <span>
          Продавцов не найдено.
        </span>
      </div>
    `;

    return;
  }

  for (let i = 0; i < arr.length; i++) {
    const { seller_id, title, registration_date } = arr[i];

    helperList.innerHTML += `
      <div class="search-form__helper-item search-form-request" role="button" tabindex="0" data-id="${seller_id}">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M16.9697 16.9697C17.2626 16.6768 17.7374 16.6768 18.0303 16.9697L22.0303 20.9697C22.3232 21.2626 22.3232 21.7374 22.0303 22.0303C21.7374 22.3232 21.2626 22.3232 20.9697 22.0303L16.9697 18.0303C16.6768 17.7374 16.6768 17.2626 16.9697 16.9697Z"
          fill="rgba(4, 15, 35, 0.3)" />
        <path
          d="M20 11C20 15.9706 15.9706 20 11 20C6.02944 20 2 15.9706 2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11Z"
          stroke="rgba(4, 15, 35, 0.3)" stroke-width="1.5" stroke-linecap="round" />
      </svg>
        ${title}
      </div>
      `;
  }
}

export function renderProductList(arr) {
  helperList.innerHTML = '';

  if (!arr) {
    helperList.innerHTML = 'Произошила ошибка, повторите запрос позже';
  }

  if (arr.length === 0) {
    helperList.innerHTML = `
      <div class="search-form__helper-item" role="button">
        <span>
          Товаров не найдено.
        </span>
      </div>
    `;

    return;
  }

  for (let i = 0; i < arr.length; i++) {
    const { product_id, title } = arr[i];

    helperList.innerHTML += `
      <div class="search-form__helper-item search-form-request" role="button" tabindex="0" data-id="${product_id}">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M16.9697 16.9697C17.2626 16.6768 17.7374 16.6768 18.0303 16.9697L22.0303 20.9697C22.3232 21.2626 22.3232 21.7374 22.0303 22.0303C21.7374 22.3232 21.2626 22.3232 20.9697 22.0303L16.9697 18.0303C16.6768 17.7374 16.6768 17.2626 16.9697 16.9697Z"
          fill="rgba(4, 15, 35, 0.3)" />
        <path
          d="M20 11C20 15.9706 15.9706 20 11 20C6.02944 20 2 15.9706 2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11Z"
          stroke="rgba(4, 15, 35, 0.3)" stroke-width="1.5" stroke-linecap="round" />
      </svg>
        ${title}
      </div>
      `;
  }
}
