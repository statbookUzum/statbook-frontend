const loader = document.querySelector('.loader');
const loaderWrapper = document.querySelector('.loader-wrapper');

if (loader) {
  window.addEventListener('load', function () {
    setTimeout(() => {
      loaderWrapper.style.cssText = 'opacity: 1; visibility: visible;'
      loader.style.cssText = 'opacity: 0; visibility: hidden;';
    }, 1500)
  });
}
