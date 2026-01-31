const $filter = document.querySelector("textarea.filter");

window.addEventListener("load", async () => {
  const { filter } = await chrome.runtime.sendMessage({ message: "load" });
  $filter.value = filter;
});

window.addEventListener("unload", async () => {
  await chrome.runtime.sendMessage({
    message: "store",
    filter: $filter.value ?? ""
  });
});
