import { changeLang } from "./change-lang";

const forms = document.querySelectorAll('.validation-form');

forms.forEach(form => {
  const inputs = form.querySelectorAll('.custom-input__input');
  const submitBtn = form.querySelector('button[type=submit]');
  const onErrors = {};

  inputs.forEach((input, index) => {
    const label = input.closest('label');
    const inputName = input.getAttribute('name');

    const error = document.createElement('div');
    error.classList.add('error-msg');

    if (label.matches('.custom-input--flex')) {
      label.insertAdjacentElement('beforeend', error);
    } else {
      label.insertAdjacentElement('afterend', error);
    }

    onErrors[`${inputName}`] = {
      errorFlag: true,
      errorNode: error,
    };

    input.addEventListener('input', inputValidate.bind(null, label, inputName, onErrors, submitBtn, input, form));
  });
});

function inputValidate(label, inputName, onErrors, submitBtn, input, form) {
  label.classList.remove('custom-input--success');

  onErrors[`${inputName}`].errorNode.textContent = '';
  disabledBtn(Object.values(onErrors).map(el => el.errorFlag), submitBtn);

  if (label.matches('.custom-input--password')) {
    // string length
    if (input.value.length < 6) {
      onErrors[`${inputName}`].errorNode.textContent = changeLang('Пароль должен содержать минимум 6 символов');
      label.classList.add('custom-input--error');
      onErrors[`${inputName}`].errorFlag = true;
      disabledBtn(Object.values(onErrors).map(el => el.errorFlag), submitBtn);

      return;
    }

    // no cyrillic
    const cyrillicRegex = /[а-яА-Я]/;

    if (cyrillicRegex.test(input.value)) {
      onErrors[`${inputName}`].errorNode.textContent = changeLang('Пароль не должен содержать кириллицы');
      label.classList.add('custom-input--error');
      onErrors[`${inputName}`].errorFlag = true;
      disabledBtn(Object.values(onErrors).map(el => el.errorFlag), submitBtn);

      return;
    }

    // compare passwords
    const newPassword = form.querySelector('[data-name=new-password]');
    const reapedPassword = form.querySelector('[data-name=reaped-password]');

    if (reapedPassword) {
      const labelNew = newPassword.closest('label');
      const labelReaped = reapedPassword.closest('label');
      if (reapedPassword.value !== newPassword.value) {
        onErrors['password_confirmation'].errorNode.textContent = changeLang('Пароли не совпадают');
        label.classList.add('custom-input--error');
        onErrors[`${inputName}`].errorFlag = true;
        disabledBtn(Object.values(onErrors).map(el => el.errorFlag), submitBtn);

        labelNew.classList.add('custom-input--error');
        labelReaped.classList.add('custom-input--error');
        return;
      } else {
        onErrors['password_confirmation'].errorNode.textContent = '';
        onErrors[`password_confirmation`].errorFlag = false;
        onErrors['password'].errorFlag = false;

        labelNew.classList.remove('custom-input--error');
        labelReaped.classList.remove('custom-input--error');

        labelNew.classList.add('custom-input--success');
        labelReaped.classList.add('custom-input--success');
      }
    }
  }

  onErrors[`${inputName}`].errorFlag = false;
  onErrors[`${inputName}`].errorNode.textContent = '';
  label.classList.remove('custom-input--error');
  label.classList.add('custom-input--success');

  disabledBtn(Object.values(onErrors).map(el => el.errorFlag), submitBtn);
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
