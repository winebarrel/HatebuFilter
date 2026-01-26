function removeEntry(entry, keywords) {
  if (keywords.some((i) => entry.innerText?.includes(i))) {
    entry.remove();
  }
}

function filterEntries(keywords) {
  const header = document.querySelector("div.entrylist-header");

  if (header) {
    removeEntry(header, keywords);
  }

  const entries = document.querySelectorAll("ul.entrylist-item > li");

  for (const e of entries) {
    removeEntry(e, keywords);
  }

  const searchEntries = document.querySelectorAll(
    "ul.entrysearch-articles > li"
  );

  for (const e of searchEntries) {
    removeEntry(e, keywords);
  }
}

async function loadKeywords() {
  const resp = await browser.runtime.sendMessage({ message: "load" });
  const filter = resp.filter ?? "";
  const keywords = filter
    .split("\n")
    .map((i) => i.trim())
    .filter((i) => i);
  return keywords;
}

function isFilterable() {
  if (location.href?.startsWith("https://b.hatena.ne.jp/entry/s/")) {
    return false;
  }

  const entrylistWrapper = document.querySelector("div.entrylist-wrapper");
  const searchContainer = document.querySelector("div.search-container");
  return entrylistWrapper != null || searchContainer != null;
}

(async () => {
  if (!isFilterable()) {
    return;
  }

  const keywords = await loadKeywords();
  const id = setInterval(() => filterEntries(keywords), 100);
  setTimeout(() => clearInterval(id), 3000);
})();

chrome.runtime.onMessage.addListener(async () => {
  if (!isFilterable()) {
    return;
  }

  const keywords = await loadKeywords();
  filterEntries(keywords);
});
