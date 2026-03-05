(() => {

const CONFIG = {
  resultsContainer: document.getElementById("results-container"),
  searchInput: document.getElementById("search-input"),
  searchJson: "/assets/search.json",
  linesAround: 2,
  minQueryLength: 2,
};

if (!CONFIG.searchInput || !CONFIG.resultsContainer) return;

let index = [];

fetch(CONFIG.searchJson)
  .then(r => r.json())
  .then(data => index = data)
  .catch(() => CONFIG.resultsContainer.innerHTML = "<p>Search unavailable.</p>");

CONFIG.searchInput.addEventListener("input", () => {
  const query = CONFIG.searchInput.value.trim().toLowerCase();

  if (!query || query.length < CONFIG.minQueryLength) {
    CONFIG.resultsContainer.innerHTML = "";
    CONFIG.resultsContainer.style.display = "none";
    return;
  }

  const queryWords = query.split(/\s+/);
  const results = [];

  for (const page of index) {
    const lines = page.content.split("\n").filter(line => line.trim().length > 0);
    const matchPositions = [];

    lines.forEach((line, i) => {
      const lower = line.toLowerCase();
      // Only match if all query words are on the same line
      const allFound = queryWords.every(q => lower.includes(q));
      if (allFound) matchPositions.push(i);
    });

    if (matchPositions.length) {
      // Build snippets around matches
      const snippets = matchPositions.map(i => {
        const start = Math.max(0, i - CONFIG.linesAround);
        const end = Math.min(lines.length - 1, i + CONFIG.linesAround);
        return { start, end };
      });

      // Merge overlapping snippets
      snippets.sort((a, b) => a.start - b.start);
      const merged = [];
      for (const s of snippets) {
        if (!merged.length) merged.push(s);
        else {
          const last = merged[merged.length - 1];
          if (s.start <= last.end) last.end = Math.max(last.end, s.end);
          else merged.push(s);
        }
      }

      results.push({ page, snippets: merged });
    }
  }

  render(results, queryWords);
});

function render(results, queryWords) {
  CONFIG.resultsContainer.innerHTML = "";
  if (!results.length) {
    CONFIG.resultsContainer.innerHTML = "<p>No results found.</p>";
    CONFIG.resultsContainer.style.display = "block";
    return;
  }

  CONFIG.resultsContainer.style.display = "block";

  for (const { page, snippets } of results) {
    const wrapper = document.createElement("div");
    wrapper.className = "result";

    const title = document.createElement("h3");
    title.className = "search-title";
    title.textContent = page.title || page.url;
    wrapper.appendChild(title);

    for (const snip of snippets) {
      const snippetLines = page.content.split("\n").slice(snip.start, snip.end + 1);
      let snippetText = snippetLines.join("<br>");

      // Highlight each query word
      queryWords.forEach(q => {
        const regex = new RegExp(`(${escapeRegExp(q)})`, "gi");
        snippetText = snippetText.replace(regex, "<mark>$1</mark>");
      });

      const snipDiv = document.createElement("div");
      snipDiv.className = "search-match";
      const p = document.createElement("p");
      p.innerHTML = snippetText;
      snipDiv.appendChild(p);

      wrapper.appendChild(snipDiv);
    }

    CONFIG.resultsContainer.appendChild(wrapper);
  }
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

})();
