(() => {
  console.log("[search] script loaded");

  const input = document.getElementById("search-input");
  const resultsContainer = document.getElementById("results-container");

  if (!input) {
    console.error("[search] #search-input NOT FOUND");
    return;
  }

  if (!resultsContainer) {
    console.error("[search] #results-container NOT FOUND");
    return;
  }

  console.log("[search] input + container found");

  fetch("/assets/search.json")
    .then(r => {
      console.log("[search] fetch status:", r.status);
      return r.json();
    })
    .then(data => {
      console.log("[search] index loaded");
      console.log("[search] entries:", data.length);
      console.log("[search] first entry:", data[0]);

      input.addEventListener("input", () => {
        const q = input.value.toLowerCase().trim();
        console.log("[search] query:", q);

        resultsContainer.innerHTML = "";

        if (!q) return;

        let hits = 0;

        for (const page of data) {
          const title = (page.title || "").toLowerCase();
          const content = (page.content || "").toLowerCase();

          if (title.includes(q) || content.includes(q)) {
            hits++;
            const el = document.createElement("div");
            el.innerHTML = `<a href="${page.url}">${page.title || page.url}</a>`;
            resultsContainer.appendChild(el);
          }
        }

        console.log("[search] hits:", hits);

        if (hits === 0) {
          resultsContainer.innerHTML = "<p>No results found.</p>";
        }
      });
    })
    .catch(err => {
      console.error("[search] fetch FAILED", err);
    });
})();
