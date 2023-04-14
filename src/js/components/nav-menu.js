const navButton = document.querySelector('.menu-btn');
const navWrapper = document.querySelector('.header__desc');

if (navButton) {
  navButton.addEventListener('click', () => {
    navButton.classList.toggle('active');
    navWrapper.classList.toggle('active');
  });
}
