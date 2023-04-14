const forms = document.querySelectorAll('.validation-form');

forms.forEach(form => {
  const inputs = form.querySelectorAll('.custom-input__input');
  const submitBtn = form.querySelector('button[type=submit]');
  const onErrors = {};

  inputs.forEach((input, index) => {
    const label = input.closest('label');

    const error = document.createElement('div');
    error.classList.add('error-msg');

    if (label.matches('.custom-input--flex')) {
      label.insertAdjacentElement('beforeend', error);
    } else {
      label.insertAdjacentElement('afterend', error);
    }

    input.addEventListener('input', inputValidate.bind(null, label, index, error, onErrors, submitBtn, input, form));
  });
});

function inputValidate(label, index, error, onErrors, submitBtn, input, form) {
  label.classList.remove('custom-input--success');

  disabledBtn(Object.values(onErrors), submitBtn);

  if (label.matches('.custom-input--password')) {
    // string length
    if (input.value.length < 6) {
      error.textContent = 'Пароль должен содержать минимум 6 символов';
      label.classList.add('custom-input--error');
      onErrors[`${index}`] = true;
      disabledBtn(Object.values(onErrors), submitBtn);
      return;
    }

    // no cyrillic
    const cyrillicRegex = /[а-яА-Я]/;

    if (cyrillicRegex.test(input.value)) {
      error.textContent = 'Пароль не должен содержать кириллицы';
      label.classList.add('custom-input--error');
      onErrors[`${index}`] = true;
      disabledBtn(Object.values(onErrors), submitBtn);
      return;
    }

    // compare passwords
    const newPassword = form.querySelector('[data-name=new-password]');
    const reapedPassword = form.querySelector('[data-name=reaped-password]');

    if (reapedPassword) {
      if (reapedPassword.value !== newPassword.value) {
        error.textContent = 'Пароли не совпадают!';
        label.classList.add('custom-input--error');
        onErrors[`${index}`] = true;
        disabledBtn(Object.values(onErrors), submitBtn);
        return;
      }
    }

    onErrors[`${index}`] = false;
  }


  if (label.matches('.custom-input--mail')) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;

    if (!emailRegex.test(input.value)) {
      error.textContent = 'Не валидный Email';
      label.classList.add('custom-input--error');
      onErrors[`${index}`] = true;

      disabledBtn(Object.values(onErrors), submitBtn);

      return;
    }
    onErrors[`${index}`] = false;
  }

  error.textContent = '';
  label.classList.remove('custom-input--error');
  label.classList.add('custom-input--success');

  disabledBtn(Object.values(onErrors), submitBtn);
}

function disabledBtn(errorArr, btn) {
  let error = false;

  errorArr.forEach(el => {
    if (el === true) error = true;
  })

  if (error) {
    if (btn.hasAttribute('disabled')) return;

    btn.disabled = 'true';
  } else {
    if (!btn.hasAttribute('disabled')) return;

    btn.removeAttribute('disabled');
  }
}
