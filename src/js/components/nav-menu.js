import { disableScroll } from '../functions/disable-scroll';
import { enableScroll } from '../functions/enable-scroll';
import { scroll } from './smoothScroll';

const navButton = document.querySelector('.menu-btn');

if (navButton) {
  const navWrapper = document.querySelector('.header__desc');
  const navLink = document.querySelectorAll('.nav__link')
  if (window.innerWidth < 992) {
    scroll.destroy();

    navButton.addEventListener('click', () => {
      navButton.classList.toggle('active');
      navWrapper.classList.toggle('active');

      if (navWrapper.matches('.active')) {
        disableScroll();
      } else {
        enableScroll();
      }
    });

    navLink.forEach(link => {
      link.addEventListener('click', (e) => {
        enableScroll();

        navButton.classList.remove('active');
        navWrapper.classList.remove('active');
      });
    });
  }
}
