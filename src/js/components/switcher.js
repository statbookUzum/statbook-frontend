const switchers = document.querySelectorAll('.switcher');

switchers.forEach(switcher => {
  const buttons = switcher.querySelectorAll('.switcher__button');
  const cover = switcher.querySelector('.switcher__cover');

  buttons.forEach((button, i) => {
    button.addEventListener('click', () => animationSwitcher(button, i));

    button.addEventListener('focus', () => animationSwitcher(button, i));
  });

  function animationSwitcher(button, i) {
    button.classList.add('active');

    if (i === 0) {
      cover.style.transform = 'translate3d(2%, -50%, 0)';
      buttons[1].classList.remove('active');

      return;
    }

    if (i === 1) {
      cover.style.transform = 'translate3d(98%, -50%, 0)';
      buttons[0].classList.remove('active');

      return;
    }
  }
});
