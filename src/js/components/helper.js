export function setHeight() {
  const contentsTabsWrapper = document.querySelectorAll(
    ".custom-tabs__content"
  );

  contentsTabsWrapper.forEach((wrapper) => {
    const activePanel = wrapper.querySelector(".custom-tabs__panel--active");
    wrapper.style.height = activePanel.offsetHeight + "px";
  });
}

export function blurElementAndChildren(element) {
  element.blur();
  const children = element.children;
  for (let i = 0; i < children.length; i++) {
    blurElementAndChildren(children[i]);
  }
}

export function debounce(func, ms) {
  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {
    if (isThrottled) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments);

    isThrottled = true;

    setTimeout(function () {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}

export function subtractDaysFromToday(days) {
  const today = new Date();
  const subtractedDate = new Date(today.getTime() - days * 24 * 60 * 60 * 1000);
  const yyyy = subtractedDate.getFullYear();
  const mm = String(subtractedDate.getMonth() + 1).padStart(2, "0");
  const dd = String(subtractedDate.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function removeYearFromDate(strDate) {
  const date = new Date(strDate);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  return `${dd}.${mm}`;
}

export function changePeriods(period) {
  if (!period) return;

  const periodElements = document.querySelectorAll("[data-days-report]");

  if (periodElements.length) {
    periodElements.forEach((item) => {
      item.textContent = period;
    });
  }
}

export function getProductSkuFromString(str) {
  let productSku = null;

  if (str.includes("skuid")) {
    productSku = str.slice(str.indexOf("skuid") + 6);
  }

  return productSku;
}
