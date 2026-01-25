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

function filterN(n, i, keywords) {
  if (n == 0) {
    return;
  }
  filterEntries(keywords);
  setTimeout(() => filterN(n - 1, i, keywords), i);
}

(async () => {
  const keywords = await loadKeywords();
  filterN(30, 100, keywords);
})();

chrome.runtime.onMessage.addListener(async () => {
  const keywords = await loadKeywords();
  filterEntries(keywords);
});
