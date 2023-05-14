export function checkDescLine() {
  const desc = document.querySelector('.seller-card__desc');
  const fullDesc = document.querySelector('.seller-card__desc-full');

  const lineHeight = window.getComputedStyle(desc).getPropertyValue('line-height');
  const height = desc.offsetHeight;

  console.log(parseInt(lineHeight), height);

  const lineAmount = Math.floor(height / parseInt(lineHeight));
  console.log(lineAmount);

  if (lineAmount < 3) {
    fullDesc.style.display = 'none';
  }
}
