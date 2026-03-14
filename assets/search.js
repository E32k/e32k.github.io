(() => {

const CONFIG = {
  resultsContainer: document.getElementById("results-container"),
  searchInput: document.getElementById("search-input"),
  searchJson: "/assets/search.json",
  minQueryLength: 2,
};

if (!CONFIG.searchInput || !CONFIG.resultsContainer) return;

let index = null;
let fetching = false;

CONFIG.searchInput.addEventListener("input", () => {
  const query = CONFIG.searchInput.value.trim().toLowerCase();

  if (!query || query.length < CONFIG.minQueryLength) {
    CONFIG.resultsContainer.innerHTML = "";
    return;
  }

  if (index) {
    searchAndRender(query);
  } else if (!fetching) {
    fetching = true;
    CONFIG.resultsContainer.textContent = "Searching...";
    fetch(CONFIG.searchJson)
      .then(r => r.json())
      .then(data => {
        index = data;
        fetching = false;
        searchAndRender(query);
      })
      .catch(() => {
        fetching = false;
        CONFIG.resultsContainer.textContent = "Search unavailable.";
      });
  } else {
    CONFIG.resultsContainer.textContent = "Searching...";
  }
});

function searchAndRender(query) {
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
}

function render(results, query) {
  CONFIG.resultsContainer.innerHTML = "";

  if (!results.length) {
    CONFIG.resultsContainer.textContent = "No results found.";
    return;
  }

  const regex = new RegExp(`(${escapeRegExp(query)})`, "gi");

  for (const { page, snippet } of results) {
    const link = document.createElement("a");
    link.href = page.url;
    link.style.textDecoration = "none";
    link.style.color = "inherit";

    const wrapper = document.createElement("div");
    wrapper.className = "search-result";

    const title = document.createElement("h3");
    title.textContent = page.title || page.url;
    wrapper.appendChild(title);

    const p = document.createElement("p");
    p.innerHTML = snippet.replace(regex, "<mark>$1</mark>");
    wrapper.appendChild(p);

    link.appendChild(wrapper);
    CONFIG.resultsContainer.appendChild(link);
  }
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

})();