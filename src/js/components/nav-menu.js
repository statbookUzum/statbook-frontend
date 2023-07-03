import { scroll } from "./smoothScroll";

const navButton = document.querySelector(".menu-btn");

if (navButton) {
  const navWrapper = document.querySelector(".header__desc");
  const navLink = document.querySelectorAll(".nav__link");
  if (window.innerWidth < 992) {
    scroll.destroy();

    navButton.addEventListener("click", () => {
      navButton.classList.toggle("active");
      navWrapper.classList.toggle("active");

      setTimeout(() => {
        if (navWrapper.matches(".active")) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "initial";
        }
      }, 500);
    });

    navLink.forEach((link) => {
      link.addEventListener("click", (e) => {
        setTimeout(() => {
          document.body.style.overflow = "initial";
        }, 500);

        navButton.classList.remove("active");
        navWrapper.classList.remove("active");
      });
    });
  }
}
