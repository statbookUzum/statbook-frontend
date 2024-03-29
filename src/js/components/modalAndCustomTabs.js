import GraphModal from "graph-modal";
import { setHeight } from "./helper";
import { scroll } from "./smoothScroll";

const customTabsList = document.querySelectorAll(".custom-tabs");
const tariffButtonsWrapper = document.querySelector(".change-tariff__inner");

const modal = new GraphModal();

if (customTabsList.length) {
  customTabsList.forEach((customTabs, i) => {
    const tabsNav = customTabs.querySelector(".custom-tabs__nav");
    const tabsBtns = customTabs.querySelectorAll(".custom-tabs__nav-btn");
    const contents = customTabs.querySelectorAll(".custom-tabs__panel");
    // modal buttons
    const topUpButton = document.querySelector(".no-money__button");

    setHeight();

    // tab buttons listeners
    tabsBtns.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        switchTabs(index, btn, tabsNav, contents, customTabs);
      });

      btn.addEventListener("keydown", (e) => {
        let dir = null;

        if (e.which === 37) {
          dir = index - 1;
        } else if (e.which === 39) {
          dir = index + 1;
        } else if (e.which === 40) {
          dir = "down";
        } else {
          dir = null;
        }
        if (dir !== null) {
          if (dir === "down") {
            contents[index].focus();
          } else if (tabsBtns[dir]) {
            switchTabs(dir, tabsBtns[dir], tabsNav, contents, customTabs);
          }
        }
      });
    });

    if (customTabs.matches(".profile-info__custom-tabs")) {
      // modal listeners
      topUpButton.addEventListener("click", () => {
        switchTabs(1, tabsBtns[1], tabsNav, contents, customTabs);

        modal.close("no-money-modal");
        scroll.animateScroll(tabsNav);
      });
    }

    if (i === 0) {
      window.addEventListener("load", function () {
        if (window.location.hash === "#topup") {
          switchTabs(1, tabsBtns[1], tabsNav, contents, customTabs);
        }
      });
    }
  });

  function switchTabs(num, currentBtn, tabsNav, contents, customTabs) {
    const oldActiveBtn = tabsNav.querySelector(".custom-tabs__nav-btn--active");
    const oldContent = customTabs.querySelector(".custom-tabs__panel--active");

    oldActiveBtn.classList.remove("custom-tabs__nav-btn--active");
    oldActiveBtn.setAttribute("tabindex", "-1");

    tabsNav.setAttribute("data-tab-active", num + 1);

    currentBtn.focus();
    currentBtn.removeAttribute("tabindex");
    currentBtn.classList.add("custom-tabs__nav-btn--active");

    oldContent.setAttribute("tabindex", "-1");
    oldContent.classList.remove("custom-tabs__panel--active");
    contents[num].classList.add("custom-tabs__panel--active");

    setHeight();
  }

  window.addEventListener("resize", () => {
    setHeight();
  });
}

if (tariffButtonsWrapper) {
  const tariffConfirmButton = document.querySelector(".tariff-confirm__button");
  const tariffConfirmTitle = document.querySelector(".tariff-confirm-name");

  tariffButtonsWrapper.addEventListener("click", ({ target }) => {
    if (target.matches(".tariff-card__submit")) {
      const card = target.closest(".tariff-card");
      const tariffInput = card.querySelector("[name=tariff-type]");
      const periodInput = card.querySelector("[name=period-type]");
      const title = card.querySelector(".tariff-card__title");

      tariffConfirmButton.setAttribute("data-tariffid", tariffInput.value);
      tariffConfirmButton.setAttribute("data-periodid", periodInput.value);
      tariffConfirmTitle.textContent = '"' + title.textContent + '"';
      modal.open("tariff-confirm-modal");
    }
  });
}
