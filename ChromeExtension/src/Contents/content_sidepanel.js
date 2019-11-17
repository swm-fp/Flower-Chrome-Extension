/* global chrome */
chrome.runtime.onMessage.addListener(function(msg, sender) {
  if (msg === "toggle") {
    // background black blur part
    const background_black = document.createElement("span");
    background_black.id = "background_modal";
    background_black.style.height = "100%";
    background_black.style.width = "100%";
    background_black.style.position = "fixed";
    background_black.style.top = "0px";
    background_black.style.right = "0px";

    background_black.style.background = "rgba(0, 0, 0, 0.7)";
    background_black.style.zIndex = "90000";
    document.body.appendChild(background_black);
    // dialog를 이용한 modal
    const modal = document.createElement("dialog");
    modal.style.height = "40%";
    modal.style.width = "40%";
    modal.style.position = "fixed";
    modal.style.borderRadius = "15px";
    modal.style.borderColor = "#584b8b";
    modal.innerHTML = `<iframe id="modal" style="height:100%; "></iframe>`;
    document.body.appendChild(modal);
    const dialog = document.querySelector("dialog");
    dialog.showModal();
    // popup.html 연동
    const iframe = document.getElementById("modal");
    iframe.style.height = "100%";
    iframe.style.width = "100%";
    iframe.src = chrome.extension.getURL("popup.html");
    iframe.frameBorder = 0;
    // background 클릭시 종료
    document.addEventListener(
      "click",
      () => {
        remove_elements();
      },
      { once: true }
    );

    let remove_elements = () => {
      modal.parentNode.removeChild(dialog);
      background_black.parentNode.removeChild(background_black);
    };
  }
});
