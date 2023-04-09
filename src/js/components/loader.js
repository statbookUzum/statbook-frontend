const loader = document.querySelector('.loader');

if (loader) {
  window.addEventListener('load', function () {
    setTimeout(() => {
      console.log(1);
      loader.classList.add('hidden');
      document.body.classList.remove('hidden');
    }, 1500)
  });
}
