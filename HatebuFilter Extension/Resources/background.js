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
