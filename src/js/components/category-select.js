import { renderHelperList } from "./get-data.js";
import { getCategorySelectData } from "./https-request.js";
const categorySelect = document.querySelector(".category-select");

if (categorySelect) {
  categorySelect.addEventListener("click", ({ target }) => {
    if (!target.closest(".category-select__list-wrapper")) {
      if (categorySelect.classList.contains("active")) {
        categorySelect.classList.remove("active");
        categorySelect.blur();

        return;
      }

      categorySelect.classList.add("active");
    }

    const item = target.closest(".category-select__item");
    if (item) {
      const title = item.querySelector(".category-select__item-title");
      const searchInput = document.querySelector(".custom-input__input");
      const hiddenInput = document.querySelector(".custom-input__hidden-id");
      searchInput.value = title.textContent.trim();
      hiddenInput.value = item.dataset.value;
      renderHelperList(searchInput.value);

      const oldActiveItem = categorySelect.querySelector(
        ".category-select__item.checked"
      );

      if (oldActiveItem) {
        oldActiveItem.classList.remove("checked");
      }

      item.classList.add("checked");

      if (item.closest(".disable")) return;

      item.classList.toggle("active");
    }
  });

  categorySelect.addEventListener("blur", () => {
    categorySelect.classList.remove("active");
  });
}

function renderCategoryItem(dataItem) {
  console.log(dataItem);
  return dataItem
    .map((item) => {
      if (item.branch.length === 0) {
        return `
        <div class="category-select__item disable" data-value="${item.category_id}">
          <div class="category-select__item-title">${item.title_ru}</div>
        </div>
      `;
      } else {
        return `
        <div class="category-select__item" data-value="${item.category_id}">
          <div class="category-select__item-title">${item.title_ru}</div>
          <div class="category-select__item-list">
            ${renderCategoryItem(item.branch)}
          </div>
        </div>
      `;
      }
    })
    .join("");
}

function renderCategorySelectData() {
  const categorySelectList = categorySelect.querySelector(
    ".category-select__list"
  );

  categorySelectList.innerHTML = `
    ${renderCategoryItem(data)}
  `;
}

getCategorySelectData().then(({ data }) => {
  renderCategorySelectData(data);
});
