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
  // Replace headings with <b>
  text = text.replace(/<(h[1-6])>(.*?)<\/\1>/gi, "<b>$2</b>");

  // Split into paragraphs (double line breaks OR <p>)
  let paragraphs = text.split(/\n\s*\n|<p>/i);

  // Find which paragraph contains the match
  let matchIndex = 0;
  let charCount = 0;
  for (let i = 0; i < paragraphs.length; i++) {
    if (position < charCount + paragraphs[i].length) {
      matchIndex = i;
      break;
    }
    charCount += paragraphs[i].length + 2; // +2 for \n\n
  }

  // Decide how many paragraphs to include
  let snippet = paragraphs[matchIndex].trim();
  let wordCount = snippet.split(/\s+/).length;
  let start = matchIndex, end = matchIndex;

  while (wordCount < 30 && (start > 0 || end < paragraphs.length - 1)) {
    if (start > 0) {
      start--;
      snippet = paragraphs[start].trim() + "\n\n" + snippet;
      wordCount = snippet.split(/\s+/).length;
    }
    if (wordCount >= 30) break;
    if (end < paragraphs.length - 1) {
      end++;
      snippet += "\n\n" + paragraphs[end].trim();
      wordCount = snippet.split(/\s+/).length;
    }
  }

  // Highlight query words
  for (const q of queryWords) {
    snippet = snippet.replace(new RegExp(`(${q})`, "gi"), "<mark>$1</mark>");
  }

  // Ensure all HTML tags are closed
  snippet = closeTags(snippet);

  // Replace line breaks with <br> to keep formatting
  snippet = snippet.replace(/\n/g, "<br>");

  return snippet;
}

// Helper: close any unclosed HTML tags (simple version)
function closeTags(html) {
  const opened = [];
  html = html.replace(/<([a-z]+)(?: [^>]*)?>/gi, (m, tag) => {
    opened.push(tag);
    return m;
  });
  html = html.replace(/<\/([a-z]+)>/gi, (m, tag) => {
    const idx = opened.lastIndexOf(tag);
    if (idx !== -1) opened.splice(idx, 1);
    return m;
  });
  // Close any remaining
  for (let i = opened.length - 1; i >= 0; i--) {
    html += `</${opened[i]}>`;
  }
  return html;
}
})();
