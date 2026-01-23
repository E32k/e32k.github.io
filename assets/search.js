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

  let index = [];
  let ready = false;

  fetch(SEARCH_URL)
    .then(r => r.json())
    .then(data => {
      index = data;
      ready = true;
    })
    .catch(err => {
      console.error("Search index failed to load:", err);
    });

  input.addEventListener("input", () => {
    if (!ready) return;

    const query = input.value.trim().toLowerCase();
    resultsContainer.innerHTML = "";

    if (query.length < CONFIG.minQueryLength) return;

    const queryWords = query.split(/\s+/);
    const results = [];

    for (const page of index) {
      if (!page.content && !page.title) continue;

      const haystack =
        ((page.title || "") + " " + (page.content || "")).toLowerCase();

      const matches = [];

      for (const word of queryWords) {
        let pos = haystack.indexOf(word);
        while (pos !== -1) {
          matches.push(pos);
          pos = haystack.indexOf(word, pos + word.length);
        }
      }

      if (matches.length) {
        results.push({ page, matches });
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
      const wrapper = document.createElement("div");
      wrapper.className = "search-result";

      const title = document.createElement("a");
      title.href = page.url;
      title.textContent = page.title || page.url;
      title.className = "search-result-title";

      wrapper.appendChild(title);

      matches
        .slice(0, CONFIG.maxMatchesPerPage)
        .forEach(pos => {
          const snippet = makeSnippet(page.content || "", pos, queryWords);
          if (!snippet) return;

          const p = document.createElement("p");
          p.className = "search-result-snippet";
          p.innerHTML = snippet;
          wrapper.appendChild(p);
        });

      resultsContainer.appendChild(wrapper);
    }
  }

  function makeSnippet(text, position, queryWords) {
    if (!text) return "";

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

    queryWords.forEach(q => {
      snippet = snippet.replace(
        new RegExp(`(${q})`, "gi"),
        "<mark>$1</mark>"
      );
    });

    return `… ${snippet} …`;
  }
})();
