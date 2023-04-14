const customInputs = document.querySelectorAll('.custom-input');

if (customInputs.length) {
  customInputs.forEach(label => {
    const input = label.querySelector('.custom-input__input');

    // show password
    if (label.matches('.custom-input--password')) {
      const passwordBtn = label.querySelector('.custom-input__pass-btn');

      passwordBtn.addEventListener('click', () => {
        if (input.type === "password") {
          passwordBtn.classList.add('custom-input__pass-btn--show');
          input.type = "text";
        } else {
          passwordBtn.classList.remove('custom-input__pass-btn--show');
          input.type = "password";
        }
      });
    }

    if (label.querySelector('.custom-input__clean')) {
      const cleanBtn = label.querySelector('.custom-input__clean');

      cleanBtn.addEventListener('click', () => {
        input.value = '';
      });
    }


  });
}
