import GraphModal from "graph-modal";

const copyBtnList = document.querySelectorAll(".extension-modal__api-key-copy");

if (copyBtnList.length) {
  copyBtnList.forEach((copyBtn) => {
    copyBtn.addEventListener("click", () => {
      const apiKey = document.querySelector(
        ".extension-modal__api-key-value"
      ).textContent;

      navigator.clipboard.writeText(apiKey.trim());

      copyBtn.textContent = "Api-ключ скопирован";
      copyBtn.disabled = true;

      setTimeout(() => {
        copyBtn.textContent = "Скопировать api-ключ";
        copyBtn.disabled = false;
      }, 3000);
    });
  });
}

const modal = new GraphModal();

if (location.hash === "#extension") {
  modal.open("extension-modal");
}
