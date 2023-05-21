export function setError(parentElement, flag) {
  const errorEl = parentElement.querySelector('.error-container');

  if (errorEl) {
    if (flag) {
      errorEl.classList.add('active');
    } else {
      errorEl.classList.remove('active');
    }
  } else {
    const errorElement = document.createElement('div');
    errorElement.classList.add('error-container');
    errorElement.innerHTML = 'Кажется что-то пошло не так, попробуйте позже.';

    parentElement.insertAdjacentElement('beforeEnd', errorElement);

    if (flag) {
      errorElement.classList.add('active');
    } else {
      errorElement.classList.remove('active');
    }
  }
}
