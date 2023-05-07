const helperWrapper = document.querySelector('.search-form__helper-wrapper');

export const showHelperList = (flag) => {
  if (flag) {
    helperWrapper.style.opacity = '1';

    return;
  }

  helperWrapper.style.opacity = '0';
}
