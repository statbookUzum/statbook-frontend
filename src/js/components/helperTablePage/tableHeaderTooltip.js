const setTableTooltipText = () => {
  const tableHeader = document.querySelectorAll("th");
  tableHeader.forEach((th) => {
    const thText = th.textContent.toLowerCase().trim();

    if (thText === "средняя цена, uzs") {
      th.setAttribute(
        "data-text",
        "Среднее арифметическое цен продаж товаров за выбранный период"
      );
      return;
    }

    if (thText === "o’rtacha narx, uzs") {
      th.setAttribute(
        "data-text",
        "Tanlangan uchun mahsulotlarni sotish narxlarining o'rtacha arifmetik qiymati"
      );
      return;
    }

    if (thText === "ср. базовая цена,. uzs") {
      th.setAttribute(
        "data-text",
        "Среднее арифметическое цен без учета скидок и акций"
      );
      return;
    }

    if (thText === "o’rtacha asosiy narx, uzs") {
      th.setAttribute(
        "data-text",
        "Chegirmalar va aksiyalarni hisobga olmagan holda narxlarning arifmetik o'rtacha qiymati"
      );
      return;
    }

    if (thText === "средний чеĸ") {
      th.setAttribute(
        "data-text",
        "Средняя арифметическая стоимость 1 заказа за выбранный период"
      );
      return;
    }

    if (thText === "o’rtacha chek") {
      th.setAttribute(
        "data-text",
        "Tanlangan davr uchun 1 ta buyurtmaning o'rtacha arifmetik qiymati"
      );
      return;
    }

    if (thText === "sotish soni, dona") {
      th.setAttribute(
        "data-text",
        "Bu buyurtma berish mumkin bo'lgan mahsulotlar sonining kamayishi"
      );
      return;
    }

    if (thText === "базовая выручка, uzs") {
      th.setAttribute(
        "data-text",
        "Выручка, рассчитанная на основе цен без учета скидок и акций"
      );
      return;
    }

    if (thText === "asosiy daromad, uzs") {
      th.setAttribute(
        "data-text",
        "Chegirmalar va aksiyalarni inobatga olmagan holda narxlar asosida hisoblangan daromad"
      );
      return;
    }

    if (thText === "стоимость остатков, uzs") {
      th.setAttribute(
        "data-text",
        "Сумма остатков в наличии, рассчитанная по текущей цене реализации"
      );
      return;
    }

    if (thText === "qoldiqlar qiymati, uzs") {
      th.setAttribute(
        "data-text",
        "Joriy sotish narxida hisoblangan mavjud qoldiqlar summasi"
      );
      return;
    }

    if (thText === "упущенная выручĸа, uzs") {
      th.setAttribute(
        "data-text",
        "Выручка, потерянная продавцом из-за отсутствия товара на складе"
      );
      return;
    }

    if (thText === "yo`qotilgan daromad, uzs") {
      th.setAttribute(
        "data-text",
        "Omborda mahsulotlar yo'qligi sababli sotuvchi tomonidan yo'qotilgan daromad"
      );
      return;
    }

    if (thText === "доля упущенной выручĸи, %") {
      th.setAttribute(
        "data-text",
        "% упущенной выручки в объеме прогнозируемой выручки."
      );
      return;
    }

    if (thText === "yo`qotilgan daromadning ulushi, %") {
      th.setAttribute(
        "data-text",
        "Tahmin qilingan daromad hajmidagi yo'qolgan daromadning %"
      );
      return;
    }

    if (thText === "кол-во акт. продавцов") {
      th.setAttribute(
        "data-text",
        "Количество активных продавцов за рассматриваемый период"
      );
      return;
    }

    if (thText === "faol sotuvchilar soni") {
      th.setAttribute("data-text", "Ko'rib chiqilayotgan davr uchun");
      return;
    }

    if (thText === "кол-во акт. товаров, шт.") {
      th.setAttribute(
        "data-text",
        "Количество активных товаров за рассматриваемый период"
      );
      return;
    }

    if (thText === "faol mahsulotlar soni, dona") {
      th.setAttribute(
        "data-text",
        "Ko'rib chiqilayotgan davr uchun faol mahsulotlar soni"
      );
      return;
    }

    if (thText === "ср. кол-во прод.товара, шт.") {
      th.setAttribute(
        "data-text",
        "Это количество проданных товаров, приходящихся на 1 продавца по категории"
      );
      return;
    }

    if (thText === "o’rtacha sotilgan mahsulotlar soni, dona") {
      th.setAttribute(
        "data-text",
        "Toifaga xos bir sotuvchiga to'g'ri keladigan sotilgan mahsulotlar soni"
      );
      return;
    }

    if (thText === "средний доход, uzs") {
      th.setAttribute(
        "data-text",
        "Сумма выручки, приходящаяся на 1 продавца по категории"
      );
      return;
    }

    if (thText === "o’rtacha daromad, uzs") {
      th.setAttribute(
        "data-text",
        "Toifaga xos bir sotuvchiga to'g'ri keladigan daromad miqdori"
      );
      return;
    }
  });
};

const setHeaderHoverListener = () => {
  const tableHeaderWithTooltips = document.querySelectorAll("th[data-text]");
  let tooltipContainer = document.querySelector(".tooltip-container");

  if (!tooltipContainer) return;

  tableHeaderWithTooltips.forEach((headerTooltip) => {
    headerTooltip.onmouseenter = function (event) {
      if (event.target.tagName === "BUTTON") return;
      const c = headerTooltip.getBoundingClientRect();
      const text = this.getAttribute("data-text");

      tooltipContainer.textContent = text;
      tooltipContainer.style.display = "block";
      tooltipContainer.style.left = `${
        c.left + headerTooltip.offsetWidth / 2
      }px`;
      tooltipContainer.style.top = `${c.top + 60}px`;
    };

    headerTooltip.onmouseleave = function (event) {
      if (event.target.tagName === "BUTTON") return;

      tooltipContainer.style.display = "none";
    };
  });
};

export const tableHeaderTooltip = () => {
  setTableTooltipText();
  setHeaderHoverListener();
};
