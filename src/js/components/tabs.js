import GraphTabs from 'graph-tabs';
const tabs = new GraphTabs('profile-tabs');

// profile tabs animation

const profileTabButtons = document.querySelectorAll('.profile-info .tabs__nav-btn');
const profileNav = document.querySelector('.profile-info .tabs__nav');

profileTabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const index = button.id[button.id.length - 1];

    setTabButtonsAnimation(index);
  })
});

function setTabButtonsAnimation(index) {
  profileNav.setAttribute('data-tab-active', index);
}
