const footerLangButton = document.querySelector('.footer__country-btn');
const footerLangList = document.querySelector('.footer__country-list');

if (footerLangList) {
  footerLangList.addEventListener('click', ({ target }) => {
    if (target.matches('.footer__country-item') && !target.matches('.active')) {
      const activeItem = footerLangList.querySelector('.footer__country-item.active');

      footerLangButton.setAttribute('data-set-lang', target.getAttribute('data-get-lang'));
      activeItem.classList.remove('active');
      target.classList.add('active');
    }
  });
}

const headerLangButton = document.querySelector('.header__lang');
if (headerLangButton) {
  headerLangButton.addEventListener('click', () => {
    const currentLang = headerLangButton.getAttribute('data-set-lang');
    const newLang = currentLang === 'ru' ? 'uz' : 'ru';

    headerLangButton.setAttribute('data-set-lang', newLang);
  });
}
