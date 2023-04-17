import Swiper from 'swiper';

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
