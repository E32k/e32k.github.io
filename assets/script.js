//MARK: Save state of sites
//saves opened and closed sites when the user refreshes
document.addEventListener('DOMContentLoaded', () => {
  const detailsList = document.querySelectorAll('.sites details');
  const saved = JSON.parse(localStorage.getItem('detailsState') || '{}');
  detailsList.forEach((detail, index) => {
    if (saved[index]) detail.open = true;
    else detail.open = false;
    detail.addEventListener('toggle', () => {
      const state = {};
      detailsList.forEach((d, i) => state[i] = d.open);
      localStorage.setItem('detailsState', JSON.stringify(state));
    });
  });
});




// MARK: Overview headings (Table of Contents)
document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main");
  const toc = document.querySelector("#TableOfContents");

  if (!main || !toc) return;

  const headings = Array.from(main.querySelectorAll("h1, h2"));
  const links = new Map();
  const usedIds = new Map();

  function slugify(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  }

  // Root list
  const rootList = document.createElement("ul");
  toc.appendChild(rootList);

  let currentH1Item = null;

  headings.forEach((heading) => {
    // Ensure unique IDs
    if (!heading.id) {
      const base = slugify(heading.textContent);
      const count = usedIds.get(base) ?? 0;

      heading.id = count === 0 ? base : `${base}-${count}`;
      usedIds.set(base, count + 1);
    }

    const link = document.createElement("a");
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent;

    const li = document.createElement("li");
    li.appendChild(link);

    if (heading.tagName === "H1") {
      // Top-level entry
      rootList.appendChild(li);
      currentH1Item = li;
    } else if (heading.tagName === "H2" && currentH1Item) {
      // Nested under last H1
      let sublist = currentH1Item.querySelector("ul");
      if (!sublist) {
        sublist = document.createElement("ul");
        currentH1Item.appendChild(sublist);
      }
      sublist.appendChild(li);
    }

    links.set(heading, link);
  });

  function updateVisibleSections() {
    const viewportTop = window.scrollY;
    const viewportBottom = viewportTop + window.innerHeight;

    headings.forEach((heading, i) => {
      const start = heading.offsetTop;
      const end =
        headings[i + 1]?.offsetTop ?? document.body.scrollHeight;

      const isVisible = start < viewportBottom && end > viewportTop;

      const link = links.get(heading);
      if (link) {
        link.classList.toggle("is-visible", isVisible);
      }
    });
  }

  updateVisibleSections();
  window.addEventListener("scroll", updateVisibleSections, { passive: true });
  window.addEventListener("resize", updateVisibleSections);
});



// Toggle dark mode
const toggle = document.getElementById('dark-mode-toggle');

toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  // Optional: store preference
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('darkMode', '1');
  } else {
    localStorage.removeItem('darkMode');
  }
});

// Load saved preference
if (localStorage.getItem('darkMode')) {
  document.body.classList.add('dark-mode');
}
