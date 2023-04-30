import SmoothScroll from 'smooth-scroll';

export const scroll = new SmoothScroll('a[href*="#"]', {
  updateURL: false,
});
