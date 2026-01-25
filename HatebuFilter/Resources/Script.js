document.querySelector("button.settings").addEventListener("click", () => {
  webkit.messageHandlers.controller.postMessage("settings");
});
