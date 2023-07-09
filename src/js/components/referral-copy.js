const copyBtns = document.querySelectorAll(".refer__copy");

if (copyBtns.length) {
  copyBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const input = btn.closest(".refer__link").querySelector(".refer__input");
      const copyText = input.value;

      if (copyText) {
        console.log(copyText);
        navigator.clipboard.writeText(copyText.trim());

        const messageEl = document.createElement("span");
        messageEl.classList.add("refer__message");
        messageEl.textContent = "Ссылка скопирована";

        btn.closest(".refer__link").append(messageEl);

        setTimeout(() => {
          messageEl.remove();
        }, 2000);
      }
    });
  });
}
