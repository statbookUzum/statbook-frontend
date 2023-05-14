import Swiper from 'swiper';
import { getCashingLostViewCard } from './cashing/cashingLostViewCard';

const wrapper = document.querySelector('.last-view__slider .swiper-wrapper');
const pageType = document.querySelector('.main').getAttribute('data-page-type');

createLastShopCards();

export function createLastShopCards() {
  if (wrapper) {
    const data = getCashingLostViewCard(pageType);

    wrapper.innerHTML = data.map(item => {
      return `
    <div class="swiper-slide">
      <article class="market-article last-view__article">
        <form action="#" class="market-article__form">
          <div class="market-article__top">
            <img class="market-article__image" src="${item.photo ? item.photo : './img/seller-card-default.svg'}" alt="GADGET Market">
            <div class="market-article__info">
              <h2 class="market-article__title">
                ${item.title}
              </h2>
              <div class="market-article__reviews">
                <span class="market-article__reviews-score">${item.rating}</span> (<span
                  class="market-article__reviews-count">${item.reviews_amount} </span> отзывов)
              </div>
              <div class="market-article__desc">
                ${item.description ? item.description : ''}
              </div>
            </div>
          </div>
          <button type="submit" class="market-article__submit main-button main-button--stroke-blue btn-reset">
            Смотреть аналитику
          </button>
        </form>
      </article>
  </div>
    `
    }).join(' ');

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
