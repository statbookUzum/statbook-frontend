import { disableScroll } from '../functions/disable-scroll';
import { enableScroll } from '../functions/enable-scroll';

const navButton = document.querySelector('.menu-btn');
const navWrapper = document.querySelector('.header__desc');

if (navButton) {
  navButton.addEventListener('click', () => {
    navButton.classList.toggle('active');
    navWrapper.classList.toggle('active');

    if (navWrapper.matches('.active')) {
      disableScroll();
    } else {
      enableScroll();
    }
  });
}
