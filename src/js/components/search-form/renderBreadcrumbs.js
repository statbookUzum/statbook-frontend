const parentsWrapper = document.querySelector('.search-form__parents-list');

export function renderBreadcrumbs(parentsList) {
  if (!parentsList) {
    parentsWrapper.innerHTML = '<div class="search-form__parents-item">Товары</div>';

    return;
  }

  parentsWrapper.innerHTML = `
        ${parentsList.map((parentItem, i) => {
    return `<div class="search-form__parents-item search-form-request ${i === parentsList.length - 1 ? 'active' : ''}" data-id=${parentItem.category_id} role="button">${parentItem.title_ru ? parentItem.title_ru : parentItem.title_uz}</div>`
  }).join(" ")}
                    `;
}
