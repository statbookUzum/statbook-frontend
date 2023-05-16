import { getHelperData } from "./https-request";
import { showHelperList } from "./search-form/show-helper-list";
import { renderCategoryList, renderShopList, renderProductList } from "./search-form/renderHelperList";
import { transformCategoryData, transformShopData, transformProductData } from "./search-form/transformSearchData";
import { renderBreadcrumbs } from "./search-form/renderBreadcrumbs";
import { setLoadingAnimation } from "./setLoadingAnimation";
import { debounce } from "./helper";
import { getMainData } from "./get-main-data";

const searchForm = document.querySelector('[data-search]');

if (searchForm) {
  const pageType = document.querySelector('.main').getAttribute('data-page-type');
  const searchInput = searchForm.querySelector('.custom-input__input');
  const inputHiddenForId = searchForm.querySelector('.custom-input__hidden-id');
  const helperWrapper = document.querySelector('.search-form__helper-wrapper');
  const periodSelect = document.querySelector('[data-period-select]');
  const lastViewContainer = document.querySelector('.last-view__slider');
  let periodRange = periodSelect.value;

  // data for category card-name
  const categoryCardData = {};

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

            categoryCardData.categoryName = responseObj.helperList[0]?.title_ru;
            categoryCardData.breadcrumbs = responseObj.breadcrumbs[responseObj.helperList[0]?.category_id]
              ?.map(item => item.title_ru ? item.title_ru : item.title_uz);

            setLoadingAnimation(helperWrapper, false);
          })
          .catch(error => {
            renderCategoryList(null);
            console.log(error);
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

      if (pageType === 'product') {
        getHelperData(value, pageType)
          .then(response => transformProductData(response))
          .then(helperList => {
            renderProductList(helperList);

            if (helperList[0]) {
              inputHiddenForId.value = helperList[0].product_id;
              inputHiddenForId.setAttribute('data-hidden-title', helperList[0].title);
            }

            setLoadingAnimation(helperWrapper, false);
          })
          .catch(error => {
            console.log(error);
            renderProductList(null);
          });
      }
    }
  }

  helperWrapper.addEventListener('click', ({ target }) => {
    if (target.matches('.search-form-request')) {
      const text = target.textContent.trim();
      const id = target.getAttribute('data-id');

      // if (inputHiddenForId.value === id) {
      //   searchInput.value = text;

      //   renderShopList([{ seller_id: id, title: text }]);
      //   searchInput.focus();
      //   return;
      // }

      // setLoadingAnimation(helperWrapper, true);

      searchInput.value = text;
      inputHiddenForId.value = id;

      if (pageType === 'shop') {
        getMainData(searchForm, pageType, categoryCardData, periodRange);
        renderShopList([{ seller_id: id, title: text }]);
      }

      if (pageType === 'category') {
        getHelperData(text, pageType)
          .then(response => transformCategoryData(response))
          .then(responseObj => {
            categoryCardData.categoryName = text;
            categoryCardData.breadcrumbs = responseObj.breadcrumbs[id]
              .map(item => item.title_ru ? item.title_ru : item.title_uz);

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

      if (pageType === 'product') {
        inputHiddenForId.setAttribute('data-hidden-title', text);

        getMainData(searchForm, pageType, categoryCardData, periodRange);
        renderShopList([{ product_id: id, title: text }]);
      }
    }
  });

  // tables and charts
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const titleForCash = pageType === 'category' ? categoryCardData.categoryName : inputHiddenForId.getAttribute('data-hidden-title');

    getMainData(searchForm, pageType, categoryCardData, periodRange);
  });

  periodSelect.addEventListener('change', () => {

    if (!inputHiddenForId.value || periodRange === periodSelect.value) return;

    periodRange = periodSelect.value;
    getMainData(searchForm, pageType, categoryCardData, periodRange);
  });

  if (lastViewContainer) {
    lastViewContainer.addEventListener('click', ({ target }) => {
      if (target.matches('.market-article__submit')) {
        inputHiddenForId.value = target.closest('.market-article').getAttribute('data-market-id');
        const title = target.closest('.market-article').querySelector('.market-article__title').textContent;
        inputHiddenForId.setAttribute('data-hidden-title', title);
        searchInput.scrollIntoView({ behavior: 'auto' });

        getMainData(searchForm, pageType, categoryCardData, periodRange);
      }
    });
  }
}
