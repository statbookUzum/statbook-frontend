import Swiper from 'swiper';
import { pageType, lastViewContainer } from './vars';
import { changeLang } from './change-lang';
import { getCashingLostViewCard } from './cashing/cashingLostViewCard';

if (lastViewContainer) {
  createLastShopCards();
}

export function createLastShopCards() {
  const wrapper = lastViewContainer.querySelector('.swiper-wrapper');
  const data = getCashingLostViewCard(pageType);

  if (pageType === 'shop') {
    wrapper.innerHTML = data.map(item => {
      return `
    <div class="swiper-slide">
      <article class="market-article last-view__article" data-market-id="${item.seller_id}">
        <div action="#" class="market-article__form">
          <div class="market-article__top">
            <img class="market-article__image" src="${item.photo ? item.photo : '/img/seller-card-default.svg'}" alt="${item.title}">
            <div class="market-article__info">
              <h2 class="market-article__title">
                ${item.title}
              </h2>
              <div class="market-article__reviews">
                <span class="market-article__reviews-score">${item.rating}</span> (<span
                  class="market-article__reviews-count">${item.reviews_amount} </span> ${changeLang('отзывов')})
              </div>
              <div class="market-article__desc">
                ${item.description ? item.description : ''}
              </div>
            </div>
          </div>
          <button type="submit" class="market-article__submit main-button main-button--stroke-blue btn-reset">
            ${changeLang('Смотреть аналитику')}
          </button>
        </div>
      </article>
  </div>
    `
    }).join(' ');
  }

  if (pageType === 'product') {
    wrapper.innerHTML = data.map(item => {
      return `
    <div class="swiper-slide">
      <article class="market-article last-view__article" data-market-id="${item.product_id}">
        <div action="#" class="market-article__form">
          <div class="market-article__top">
            <img class="market-article__image" src="${item.photo ? item.photo : '/img/seller-card-default.svg'}" alt="${item.title}">
            <div class="market-article__info">
              <h2 class="market-article__title market-article__title--product">
                ${item.title}
              </h2>
              <div class="market-article__seller">
                ${changeLang('Продавец')}:
                <div class="market-article__seller-name">
                ${item.seller_title}
                </div>
              </div>
            </div>
          </div>
          <button type="submit" class="market-article__submit main-button main-button--stroke-blue btn-reset">
            ${changeLang('Смотреть аналитику')}
          </button>
        </div>
      </article>
  </div>
    `
    }).join(' ');
  }

  const swiper = new Swiper('.last-view__slider', {
    slidesPerView: 1,

    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1300: {
        slidesPerView: 3,
      }
    }
  });
}

const swiperReviews = new Swiper('.reviews__slider', {
  slidesPerView: 1,

  breakpoints: {
    576: {
      slidesPerView: 'auto',
      spaceBetween: 40,
      freeMode: true,
    }
  }
});
