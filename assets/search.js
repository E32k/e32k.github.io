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
    CONFIG.resultsContainer.style.display = "none"; // hide when empty
    return;
  }

  if (index) {
    searchAndRender(query);
  } else if (!fetching) {
    fetching = true;
    CONFIG.resultsContainer.textContent = "Searching...";
    CONFIG.resultsContainer.style.display = "block"; // show loading
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
    CONFIG.resultsContainer.style.display = "block"; // show loading
  }
});

function searchAndRender(query) {
  const results = [];

  for (const page of index) {
    const words = page.content.split(/\s+/);
    const lowerWords = words.map(w => w.toLowerCase());

    // Count occurrences of query in this page
    const occurrences = lowerWords.filter(w => w.includes(query)).length;
    if (occurrences === 0) continue;

    // Find first match for snippet
    const i = lowerWords.findIndex(w => w.includes(query));
    const start = Math.max(0, i - 2);
    const end = i + 3; // slice is exclusive
    const snippet = words.slice(start, end).join(" ");

    results.push({
      page,
      snippet,
      occurrences
    });
  }

  // Sort results by number of occurrences (descending)
  results.sort((a, b) => b.occurrences - a.occurrences);
  render(results, query);
}

function render(results, query) {
  CONFIG.resultsContainer.innerHTML = "";

  if (!results.length) {
    CONFIG.resultsContainer.textContent = "No results found.";
    CONFIG.resultsContainer.style.display = "block"; // show container even if empty
    return;
  }

  CONFIG.resultsContainer.style.display = "block"; // show container with results

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