/* global chrome */
chrome.runtime.onMessage.addListener(function(msg, sender) {
  if (msg === "toggle") {
    const modal = document.createElement("dialog");
    modal.style.height = "40%";
    modal.style.width = "40%";
    modal.innerHTML = `<iframe id="modal" style="height:100%"></iframe>`;
    document.body.appendChild(modal);
    const dialog = document.querySelector("dialog");
    dialog.showModal();
    const iframe = document.getElementById("modal");
    iframe.style.height = "100%";
    iframe.style.width = "100%";
    iframe.src = chrome.extension.getURL("popup.html");
    iframe.frameBorder = 0;
    document.addEventListener("click", () => {
      dialog.parentNode.removeChild(dialog);
    });
  }
});
