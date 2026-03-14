(() => {

const CONFIG = {
  resultsContainer: document.getElementById("results-container"),
  searchInput: document.getElementById("search-input"),
  searchJson: "/assets/search.json",
  minQueryLength: 2,
};

if (!CONFIG.searchInput || !CONFIG.resultsContainer) return;

let index = null; // JSON not loaded yet
let fetching = false; // prevent duplicate fetches

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
    // <a> wrapper, whole block clickable
    const resultLink = document.createElement("a");
    resultLink.className = "search-result";
    resultLink.href = page.url;
    resultLink.style.display = "block"; // make the whole area clickable
    resultLink.style.textDecoration = "none"; // optional: remove underline
    resultLink.style.color = "inherit"; // optional: inherit text color

    const title = document.createElement("h3");
    title.textContent = page.title || page.url;
    resultLink.appendChild(title);

    const p = document.createElement("p");
    p.innerHTML = snippet.replace(regex, "<mark>$1</mark>");
    resultLink.appendChild(p);

    CONFIG.resultsContainer.appendChild(resultLink);
  }
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

})();