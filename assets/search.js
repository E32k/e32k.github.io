(() => {

const CONFIG = {
  resultsContainer: document.getElementById("results-container"),
  searchInput: document.getElementById("search-input"),
  searchJson: "/assets/search.json",
  minQueryLength: 2,
};

if (!CONFIG.searchInput || !CONFIG.resultsContainer) return;

let index = [];

fetch(CONFIG.searchJson)
  .then(r => r.json())
  .then(data => index = data)
  .catch(() => CONFIG.resultsContainer.textContent = "Search unavailable.");

CONFIG.searchInput.addEventListener("input", () => {
  const query = CONFIG.searchInput.value.trim().toLowerCase();

  if (!query || query.length < CONFIG.minQueryLength) {
    CONFIG.resultsContainer.innerHTML = "";
    return;
  }

  const results = [];

  for (const page of index) {
    const words = page.content.split(/\s+/);
    const lowerWords = words.map(w => w.toLowerCase());

    const i = lowerWords.findIndex(w => w.includes(query));
    if (i === -1) continue;

    const before = words[i - 1] || "";
    const match = words[i];
    const after = words[i + 1] || "";

    results.push({
      page,
      snippet: `${before} ${match} ${after}`
    });
  }

  render(results, query);
});

function render(results, query) {
  CONFIG.resultsContainer.innerHTML = "";

  if (!results.length) {
    CONFIG.resultsContainer.textContent = "No results found.";
    return;
  }

  const regex = new RegExp(`(${escapeRegExp(query)})`, "gi");

  for (const { page, snippet } of results) {

    const result = document.createElement("a");
    result.className = "search-result";
    result.href = page.url;

    const title = document.createElement("h3");
    title.textContent = page.title || page.url;

    const p = document.createElement("p");
    p.innerHTML = snippet.replace(regex, "<mark>$1</mark>");

    result.appendChild(title);
    result.appendChild(p);

    CONFIG.resultsContainer.appendChild(result);
  }
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

})();