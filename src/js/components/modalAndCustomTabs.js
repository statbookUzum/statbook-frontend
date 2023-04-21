import GraphModal from 'graph-modal';
const customTabs = document.querySelector('.custom-tabs');

const modal = new GraphModal();


if (customTabs) {
  const tabsNav = customTabs.querySelector('.custom-tabs__nav');
  const tabsBtns = customTabs.querySelectorAll('.custom-tabs__nav-btn');
  const contents = customTabs.querySelectorAll('.custom-tabs__panel');
  const contentsWrapper = document.querySelector('.custom-tabs__content');
  // modal buttons
  const topUpButton = document.querySelector('.no-money__button');

  contentsWrapper.style.height = contents[0].offsetHeight + 'px';

  // tab buttons listeners
  tabsBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {

      switchTabs(index, btn);
    });

    btn.addEventListener('keydown', (e) => {
      let dir = null;

      if (e.which === 37) {
        dir = index - 1;
      } else if (e.which === 39) {
        dir = index + 1;
      } else if (e.which === 40) {
        dir = 'down';
      } else {
        dir = null;
      }
      if (dir !== null) {
        if (dir === 'down') {
          contents[index].focus();
        } else if (tabsBtns[dir]) {
          switchTabs(dir, tabsBtns[dir]);
        }
      }
    })
  })

  // modal listeners
  topUpButton.addEventListener('click', () => {
    switchTabs(1, tabsBtns[1]);

    modal.close('no-money-modal');
    tabsNav.scrollIntoView({ block: 'center', behavior: 'smooth' });
  });

  function switchTabs(num, currentBtn) {
    const oldActiveBtn = tabsNav.querySelector('.custom-tabs__nav-btn--active');
    const oldContent = customTabs.querySelector('.custom-tabs__panel--active');

    oldActiveBtn.classList.remove('custom-tabs__nav-btn--active');
    oldActiveBtn.setAttribute('tabindex', '-1');

    tabsNav.setAttribute('data-tab-active', num + 1);

    currentBtn.focus();
    currentBtn.removeAttribute('tabindex');
    currentBtn.classList.add('custom-tabs__nav-btn--active');


    oldContent.setAttribute('tabindex', '-1');
    oldContent.classList.remove('custom-tabs__panel--active');
    contentsWrapper.style.height = contents[num].offsetHeight + 'px';

    contents[num].classList.add('custom-tabs__panel--active');
  }
}
