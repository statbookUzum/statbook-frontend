import GraphModal from 'graph-modal';
const closeButton = document.querySelector('.close-no-money-modal');
const topUpButton = document.querySelector('.no-money__button');

const modal = new GraphModal();

closeButton.addEventListener('click', () => {
  modal.close('no-money-modal');
});

topUpButton.addEventListener('click', () => {
  const tabsContent = document.querySelectorAll('.tabs__panel');
  const tabsButtons = document.querySelectorAll('.tabs__nav-btn');
  const tabsNav = document.querySelector('.tabs__nav');

  for (let i = 0; i < tabsContent.length; i++) {
    tabsContent[i].classList.remove('tabs__panel--active');
    tabsButtons[i].classList.remove('tabs__nav-btn--active');
  }

  tabsContent[1].classList.add('tabs__panel--active');
  tabsButtons[1].classList.add('tabs__nav-btn--active');
  tabsNav.setAttribute('data-tab-active', '2');

  modal.close('no-money-modal');

  tabsNav.scrollIntoView({ block: 'center', behavior: 'smooth' });
});
