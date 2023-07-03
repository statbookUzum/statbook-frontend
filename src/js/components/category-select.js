import { renderHelperList } from "./get-data.js";

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

      if (item.closest(".disable")) return;

      item.classList.toggle("active");
    }
  });

  categorySelect.addEventListener("blur", () => {
    categorySelect.classList.remove("active");
  });
}
