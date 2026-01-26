browser.runtime.onMessage.addListener(
  async (request, _sender, sendResponse) => {
    switch (request.message) {
      case "load":
        const { filter } = await chrome.storage.local.get("filter");
        await sendResponse({ filter: filter ?? "" });
        break;
      case "store":
        await chrome.storage.local.set({ filter: request.filter ?? "" });
        break;
    }
  }
);

chrome.tabs.onUpdated.addListener(async (tabId, props, tab) => {
  if (
    props.status == "complete" &&
    tab.url?.startsWith("https://b.hatena.ne.jp") &&
    !tab.url?.startsWith("https://b.hatena.ne.jp/entry/s/")
  ) {
    await chrome.tabs.sendMessage(tabId, {});
  }
});
