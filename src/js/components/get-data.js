import { getHelperData, getDataWithId } from "./https-request";
import { showHelperList } from "./search-form/show-helper-list";
import { renderCategoryList, renderShopList } from "./search-form/renderHelperList";
import { transformCategoryData, transformShopData } from "./search-form/transformSearchData";
import { renderBreadcrumbs } from "./search-form/renderBreadcrumbs";
import { setLoadingAnimation } from "./setLoadingAnimation";
import { debounce } from "./helper";

const searchForm = document.querySelector('[data-search]');

if (searchForm) {
  const pageType = document.querySelector('.main').getAttribute('data-page-type');
  const searchInput = searchForm.querySelector('.custom-input__input');
  const inputHiddenForId = searchForm.querySelector('.custom-input__hidden-id');
  const helperWrapper = document.querySelector('.search-form__helper-wrapper');

  let debounceRender = debounce(renderHelperList, 1500);

  searchInput.addEventListener('input', () => {
    debounceRender(searchInput.value);
  });

  function renderHelperList(value) {
    showHelperList(value);

    if (value) {
      setLoadingAnimation(helperWrapper, true);

      if (pageType === 'category') {
        getHelperData(value, pageType)
          .then(response => transformCategoryData(response))
          .then(responseObj => {
            renderBreadcrumbs(responseObj.breadcrumbs[responseObj.helperList[0]?.category_id]);
            renderCategoryList(responseObj.helperList);

            inputHiddenForId.value = responseObj.helperList[0] ? responseObj.helperList[0].category_id : '';

            setLoadingAnimation(helperWrapper, false);
          })
          .catch(error => {
            console.log(error);
            renderCategoryList(null);
          });
      }

      if (pageType === 'shop') {
        getHelperData(value, pageType)
          .then(response => transformShopData(response))
          .then(helperList => {
            renderShopList(helperList);

            inputHiddenForId.value = helperList[0] ? helperList[0].seller_id : '';

            setLoadingAnimation(helperWrapper, false);
          })
          .catch(error => {
            console.log(error);
            renderShopList(null);
          });
      }
    }
  }

  helperWrapper.addEventListener('click', ({ target }) => {
    if (target.matches('.search-form-request')) {
      const text = target.textContent.trim();
      const id = target.getAttribute('data-id');

      setLoadingAnimation(helperWrapper, true);

      searchInput.value = text;

      if (inputHiddenForId.value === id) return;

      inputHiddenForId.value = id;

      if (pageType === 'category') {
        getHelperData(text, pageType)
          .then(response => transformCategoryData(response))
          .then(responseObj => {
            renderBreadcrumbs(responseObj.breadcrumbs[id]);
            renderCategoryList(responseObj.helperList);
            searchInput.focus();

            setLoadingAnimation(helperWrapper, false);
          })
          .catch(error => {
            console.log(error);
            renderCategoryList(null);
          });
      }

      if (pageType === 'shop') {
        getHelperData(text, pageType)
          .then(response => transformShopData(response))
          .then(helperList => {
            renderShopList(helperList);
            searchInput.focus();

            setLoadingAnimation(helperWrapper, false);
          })
          .catch(error => {
            console.log(error);
            renderShopList(null);
          });
      }
    }
  });
}
