import { getShopHelperList, getShopDataWithId } from "./https-request";
import { debounce } from "./helper";

const searchForm = document.querySelector('[data-search]');

if (searchForm) {
  const searchInput = searchForm.querySelector('.custom-input__input');
  const helperList = document.querySelector('.search-form__helper-list');
  const inputSellerId = searchForm.querySelector('.custom-input__hidden-id');

  let debounceRender = debounce(renderShopHelperList, 1500);

  searchInput.addEventListener('input', () => {
    debounceRender(searchInput.value);
  });

  function renderShopHelperList(value) {
    if (!value) {
      helperList.style.opacity = '0';

      helperList.innerHTML = '';
    }

    if (value) {
      helperList.style.opacity = '1';

      getShopHelperList(value)
        .then(response => {
          helperList.innerHTML = '';
          console.log(response.data);
          for (let i = 0; i <= 30; i++) {
            helperList.innerHTML += `
          <li class="search-form__helper-item" role="button" tabindex="0" data-seller-id="${response.data[i].seller_id}">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M16.9697 16.9697C17.2626 16.6768 17.7374 16.6768 18.0303 16.9697L22.0303 20.9697C22.3232 21.2626 22.3232 21.7374 22.0303 22.0303C21.7374 22.3232 21.2626 22.3232 20.9697 22.0303L16.9697 18.0303C16.6768 17.7374 16.6768 17.2626 16.9697 16.9697Z"
              fill="rgba(4, 15, 35, 0.3)" />
            <path
              d="M20 11C20 15.9706 15.9706 20 11 20C6.02944 20 2 15.9706 2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11Z"
              stroke="rgba(4, 15, 35, 0.3)" stroke-width="1.5" stroke-linecap="round" />
          </svg>
            ${response.data[i].title}
        </li>
          `;
          }
        })
        .catch(error => {
          if (error.request) {
            helperList.innerHTML = `
            <li class="search-form__helper-item" role="button">
            <span>
              Продавцов не найдено.
            </span>
          </li>
            `;
            console.log(error.request.response);
          }
        });
    }
  }

  helperList.addEventListener('click', ({ target }) => {
    if (target.matches('.search-form__helper-item')) {
      searchInput.value = target.textContent.trim();
      inputSellerId.value = target.getAttribute('data-seller-id');

      getShopDataWithId(target.getAttribute('data-seller-id'))
        .then(response => console.log(response));
    }
  });
}
