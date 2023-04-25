export function setHeight() {
  const contentsTabsWrapper = document.querySelectorAll('.custom-tabs__content');

  contentsTabsWrapper.forEach(wrapper => {
    const activePanel = wrapper.querySelector('.custom-tabs__panel--active');
    wrapper.style.height = activePanel.offsetHeight + 'px';
  });
}
