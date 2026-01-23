(() => {
  const SEARCH_URL = "/assets/search.json";

  const CONFIG = {
    contextWords: 30,        // target ~30 words in snippet
    maxResults: 10,
    maxMatchesPerPage: 5,
    minQueryLength: 2,
    snippetLinesAbove: 3,    // include these many lines above match
    snippetLinesBelow: 3     // include these many lines below match
  };

  const input = document.getElementById("search-input");
  const resultsContainer = document.getElementById("results-container");

  if (!input || !resultsContainer) return;

  let index = [];

  fetch(SEARCH_URL)
    .then(r => r.json())
    .then(data => index = data)
    .catch(() => resultsContainer.innerHTML = "<p>Search unavailable.</p>");

  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    resultsContainer.innerHTML = "";
    if (query.length < CONFIG.minQueryLength || !index.length) return;

    const queryWords = query.split(/\s+/);
    const results = [];

    for (const page of index) {
      const text = page.content.toLowerCase();
      const matches = [];

      for (const q of queryWords) {
        let pos = text.indexOf(q);
        while (pos !== -1) {
          matches.push(pos);
          pos = text.indexOf(q, pos + q.length);
        }
      }

      if (matches.length) {
        matches.sort((a, b) => a - b);
        const merged = [];
        let snippetStart = matches[0];

        for (let i = 1; i < matches.length; i++) {
          if (matches[i] - snippetStart <= CONFIG.contextWords * 8) continue;
          merged.push(snippetStart);
          snippetStart = matches[i];
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
    // Title outside of snippet container
    const h1 = document.createElement("h1");
    h1.textContent = page.title || page.url;
    resultsContainer.appendChild(h1);

    // Container for each result
    const wrapper = document.createElement("div");
    wrapper.className = "result";

    matches.slice(0, CONFIG.maxMatchesPerPage).forEach(pos => {
      const snippetHTML = makeSnippet(page.content, pos, queryWords);
      if (!snippetHTML) return;

      const p = document.createElement("p");
      p.innerHTML = snippetHTML;
      wrapper.appendChild(p);
    });

    resultsContainer.appendChild(wrapper);
  }
}

  function makeSnippet(html, position, queryWords) {
    // Split HTML into lines
    const lines = html.split(/\n/);

    // Find the line containing the match
    let matchLineIndex = 0;
    let charCount = 0;
    for (let i = 0; i < lines.length; i++) {
      if (position < charCount + lines[i].length + 1) {
        matchLineIndex = i;
        break;
      }
      charCount += lines[i].length + 1;
    }

    // Determine snippet range: include lines above/below for context
    let start = Math.max(0, matchLineIndex - CONFIG.snippetLinesAbove);
    let end = Math.min(lines.length - 1, matchLineIndex + CONFIG.snippetLinesBelow);

    // Merge lines
    let snippetLines = lines.slice(start, end + 1);

    // Count words; if less than target, try expanding
    let wordCount = snippetLines.join(" ").split(/\s+/).filter(Boolean).length;
    while (wordCount < CONFIG.contextWords) {
      if (start > 0) start--;
      if (end < lines.length - 1) end++;
      snippetLines = lines.slice(start, end + 1);
      wordCount = snippetLines.join(" ").split(/\s+/).filter(Boolean).length;
      if (start === 0 && end === lines.length - 1) break;
    }

    let snippet = snippetLines.join("\n");

    // Replace headings with <b>
    snippet = snippet.replace(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi, "<b>$1</b>");

    // Highlight query words
    for (const q of queryWords) {
      snippet = snippet.replace(new RegExp(`(${escapeRegExp(q)})`, "gi"), "<mark>$1</mark>");
    }

    // Ensure code blocks end properly
    snippet = closeTags(snippet);

    return snippet;
  }

  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function closeTags(html) {
    // Basic tag stack to prevent broken HTML in snippets
    const stack = [];
    return html.replace(/<(\/?)(\w+)([^>]*)>/g, (match, close, tag) => {
      tag = tag.toLowerCase();
      if (close) {
        const last = stack[stack.length - 1];
        if (last === tag) stack.pop();
        return match;
      } else if (!/br|hr|img|code/.test(tag)) {
        stack.push(tag);
        return match;
      }
      return match;
    }) + stack.reverse().map(t => `</${t}>`).join("");
  }
})();
