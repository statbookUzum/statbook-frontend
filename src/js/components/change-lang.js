import { typeOfLang } from "./vars";

const footerLangButton = document.querySelector(".footer__country-btn");
const footerLangList = document.querySelector(".footer__country-list");

if (footerLangList) {
  footerLangList.addEventListener("click", ({ target }) => {
    if (target.matches(".footer__country-item") && !target.matches(".active")) {
      const activeItem = footerLangList.querySelector(
        ".footer__country-item.active"
      );

      footerLangButton.setAttribute(
        "data-set-lang",
        target.getAttribute("data-get-lang")
      );
      activeItem.classList.remove("active");
      target.classList.add("active");
    }
  });
}

const headerLangButton = document.querySelector(".header__lang");
if (headerLangButton) {
  headerLangButton.addEventListener("click", () => {
    const currentLang = headerLangButton.getAttribute("data-set-lang");
    const newLang = currentLang === "ru" ? "uz" : "ru";

    headerLangButton.setAttribute("data-set-lang", newLang);
  });
}

export function changeLang(word) {
  const langObj = {
    "продано товаров, шт": "Sotilgan mahsulotlar, dona",
    "выручĸа, uzs": "Daromad, UZS",
    "количество ĸатегорий": "Toifalar soni",
    "средний чеĸ": "O`rtacha chek, UZS",
    отзывов: "fikrlar",
    "продавец на uzum с": "Sotuvchi UZUMda",
    года: "yildan",
    млрд: "mlrd",
    млн: "mln",
    тыс: "ming",
    "смотреть аналитику": "Tahlilni ko`rib chiqish",
    "количество подкатегорий": "Kichik toifalar soni",
    "количество заĸазов": "Buyurtmalar soni",
    "выручĸа, uzs": "Daromad, UZS",
    "количество продавцов": "Sotuvchilar soni",
    "количество товаров": "Mahsulotlar soni",
    цена: "Narx",
    "ср. цена продаж": "O`rtacha narx, UZS",
    "остаток (в наличии)": "Qoldiq (mavjud), dona",
    продавец: "Sotuvchi",
    сум: "so`m",
    "шт.": "dona",
    "пароль не должен содержать кириллицы":
      "Parolda kirill yozuvi bo`lmasligi kerak",
    "пароль должен содержать минимум 6 символов":
      "Parol kamida 6 ta belgidan iborat bo`lishi kerak",
    "пароли не совпадают": "Parollar mos kelmadi",
    "произошла ошибка, повторите запрос позже":
      "Hatolik ro`y berdi. Iltimos keyinroq yana urinib ko`ring",
    "продавцов не найдено": "Sotuvchilar topilmadi",
    "данных категорий не найдено": "Turkum maʼlumotlari topilmadi",
    "товаров не найдено": "Mahsulotlar topilmadi",
    "кажется что-то пошло не так, попробуйте позже":
      "Nimadir xato ketdi shekilli, keyinroq qayta urinib ko‘ring",
    "данные обрабатываются": "Ma`lumotlar ishlanmoqda",
    "график продаж": "Sotuvlar grafiki",
    "график цены": "Narx grafiki",
    "график остатков": "Qoldiqlar grafiki",
    "загрузить все данные": "Barcha ma`lumotlarni yuklash",
    "количество позиций": "Pozitsiyalar soni",
    "ссылка на продукт": "Mahsulot havolasi",
    "статистика по всем sku": "Barcha sku bo`yicha statistika",
    "Характеристики отсутствуют": "Xarakteristikalar mavjud emas",
    "cтатистика по всем sku": "Barcha SKU bo`yicha statistika",
  };

  return typeOfLang === "ru" ? word : langObj[word.toLowerCase()];
}
