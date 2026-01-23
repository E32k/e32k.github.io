(() => {
  const SEARCH_URL = "/assets/search.json";

  // Adjustable settings
  const CONFIG = {
    contextWords: 20,      // words around the match
    maxResults: 10,        // max pages shown
    maxMatchesPerPage: 5,  // max snippets per page
    minQueryLength: 2
  };

  const input = document.getElementById("search-input");
  const resultsContainer = document.getElementById("results-container");

  let index = [];

  // Load search index once
  fetch(SEARCH_URL)
    .then(res => res.json())
    .then(data => {
      index = data;
    })
    .catch(err => {
      console.error("Failed to load search index:", err);
    });

  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    resultsContainer.innerHTML = "";

    if (query.length < CONFIG.minQueryLength) return;

    const words = query.split(/\s+/);

    const results = [];

    for (const page of index) {
      const content = page.content.toLowerCase();
      const matches = [];

      for (const word of words) {
        let pos = content.indexOf(word);
        while (pos !== -1) {
          matches.push(pos);
          pos = content.indexOf(word, pos + word.length);
        }
      }

      if (matches.length) {
        results.push({
          page,
          matches
        });
      }
    }

    renderResults(results.slice(0, CONFIG.maxResults), words);
  });

  function renderResults(results, queryWords) {
    if (!results.length) {
      resultsContainer.innerHTML = "<p>No results found.</p>";
      return;
    }

    for (const { page, matches } of results) {
      const pageEl = document.createElement("div");
      pageEl.className = "search-result";

      const title = document.createElement("a");
      title.href = page.url;
      title.textContent = page.title;
      title.className = "search-result-title";

      pageEl.appendChild(title);

      const snippets = matches
        .slice(0, CONFIG.maxMatchesPerPage)
        .map(pos => createSnippet(page.content, pos, queryWords));

      for (const snippet of snippets) {
        const p = document.createElement("p");
        p.className = "search-result-snippet";
        p.innerHTML = snippet;
        pageEl.appendChild(p);
      }

      resultsContainer.appendChild(pageEl);
    }
  }

  function createSnippet(text, position, queryWords) {
    const words = text.split(/\s+/);
    let charCount = 0;
    let wordIndex = 0;

    while (charCount < position && wordIndex < words.length) {
      charCount += words[wordIndex].length + 1;
      wordIndex++;
    }

    const start = Math.max(0, wordIndex - CONFIG.contextWords);
    const end = Math.min(words.length, wordIndex + CONFIG.contextWords);

    let snippet = words.slice(start, end).join(" ");

    // Highlight matches
    for (const q of queryWords) {
      const regex = new RegExp(`(${q})`, "gi");
      snippet = snippet.replace(regex, "<mark>$1</mark>");
    }

    return `… ${snippet} …`;
  }
})();
