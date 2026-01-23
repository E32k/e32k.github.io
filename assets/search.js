(() => {
  const SEARCH_URL = "/assets/search.json";

  const CONFIG = {
    contextWords: 20,
    maxResults: 10,
    maxMatchesPerPage: 5,
    minQueryLength: 2
  };

  const input = document.getElementById("search-input");
  const resultsContainer = document.getElementById("results-container");

  if (!input || !resultsContainer) return;

  let index = [];

  fetch(SEARCH_URL)
    .then(r => r.json())
    .then(data => {
      index = data;
    })
    .catch(() => {
      resultsContainer.innerHTML = "<p>Search unavailable.</p>";
    });

  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    resultsContainer.innerHTML = "";

    if (query.length < CONFIG.minQueryLength || !index.length) return;

    const queryWords = query.split(/\s+/);
    const results = [];

    for (const page of index) {
      const text = (page.title + " " + page.content).toLowerCase();
      const matches = [];

      // Collect match positions
      for (const q of queryWords) {
        let pos = text.indexOf(q);
        while (pos !== -1) {
          matches.push(pos);
          pos = text.indexOf(q, pos + q.length);
        }
      }

      if (matches.length) {
        // Merge close matches into a single snippet
        matches.sort((a, b) => a - b);
        const merged = [];
        let snippetStart = matches[0];

        for (let i = 1; i < matches.length; i++) {
          if (matches[i] - snippetStart <= CONFIG.contextWords * 8) {
            // Merge if matches are close (~avg word length)
            continue;
          } else {
            merged.push(snippetStart);
            snippetStart = matches[i];
          }
        }
        merged.push(snippetStart);

        results.push({ page, matches: merged });
      }
    }

    render(results.slice(0, CONFIG.maxResults), queryWords);
  });

  function render(results, queryWords) {
    if (!results.length) {
      resultsContainer.innerHTML = "<p>No results found.</p>";
      return;
    }

    for (const { page, matches } of results) {
      const wrapper = document.createElement("a");
      wrapper.href = page.url;
      wrapper.className = "search-result";
      wrapper.style.display = "block";
      wrapper.style.textDecoration = "none";
      wrapper.style.color = "inherit";

      const h1 = document.createElement("h1");
      h1.textContent = page.title || page.url;
      wrapper.appendChild(h1);

      matches.slice(0, CONFIG.maxMatchesPerPage).forEach(pos => {
        const snippet = makeSnippet(page.content || "", pos, queryWords);
        if (!snippet) return;

        const p = document.createElement("p");
        p.innerHTML = snippet;
        wrapper.appendChild(p);
      });

      resultsContainer.appendChild(wrapper);
    }
  }

function makeSnippet(text, position, queryWords) {
  // Split text into lines
  const lines = text.split(/\n/);

  // Find the line that contains the match
  let matchLine = "";
  let charCount = 0;
  for (const line of lines) {
    if (position < charCount + line.length + 1) {
      matchLine = line;
      break;
    }
    charCount += line.length + 1; // +1 for newline
  }

  // Highlight query words in that line
  for (const q of queryWords) {
    matchLine = matchLine.replace(new RegExp(`(${q})`, "gi"), "<mark>$1</mark>");
  }

  return matchLine.trim();
}
})();
