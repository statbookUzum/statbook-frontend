const formatInput = document.querySelector('.format-sum');

function formatNumberInput(input) {
  let cleanValue = input.value.replace(/[^\d,]/g, '');

  let parts = cleanValue.split(',');
  let integerPart = parts[0];
  let decimalPart = parts.length > 1 ? ',' + parts[1] : '';

  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  input.value = integerPart + decimalPart;
}

formatInput.addEventListener('input', () => formatNumberInput(formatInput));
