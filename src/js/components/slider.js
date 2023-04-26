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
