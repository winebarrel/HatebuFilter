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

async function update() {
  const resp = await browser.runtime.sendMessage({ message: "load" });
  const filter = resp.filter ?? "";
  const keywords = filter
    .split("\n")
    .map((i) => i.trim())
    .filter((i) => i);
  filterEntries(keywords);
}

function updateN(n, i) {
  if (n == 0) {
    return;
  }
  update();
  setTimeout(() => updateN(n - 1, i), i);
}

updateN(30, 100);

chrome.runtime.onMessage.addListener(async () => {
  await update();
});
