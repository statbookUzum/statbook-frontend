import GraphModal from "graph-modal";

const copyBtn = document.querySelector(".extension-modal__api-key-copy");

if (copyBtn) {
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
}

const modal = new GraphModal();

if (location.hash === "#extension") {
  modal.open("extension-modal");
}
