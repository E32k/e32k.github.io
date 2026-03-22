// MARK: Sites navigation
const sites = document.getElementById("sites")
const burger = document.getElementById("nav-burger")

function normalize(path) {
  return path.replace(/\/+$/, "")
}

function openCurrentPage() {
  const current = normalize(window.location.pathname)

  const links = sites.querySelectorAll("a")

  links.forEach(link => {
    const href = normalize(link.getAttribute("href"))

    if (href === current) {
      link.classList.add("active")

      let el = link.parentElement

      while (el && el !== sites) {
        // open top-level folders
        if (el.classList.contains("main-folder")) {
          el.classList.add("open", "active")
        }

        // open nested folders (li that has a sublist)
        if (
          el.tagName === "LI" &&
          el.querySelector(":scope > ul")
        ) {
          el.classList.add("open", "active")
        }

        el = el.parentElement
      }
    }
  })
}

// burger toggle (unchanged)
burger.addEventListener("click", () => {
  sites.classList.toggle("open")
})

document.addEventListener("DOMContentLoaded", openCurrentPage)



// MARK: Overview headings (Table of Contents)
document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main");
  const toc = document.querySelector("#TableOfContents");

  if (!main || !toc) return;

  const headings = Array.from(main.querySelectorAll("h2, h3"));
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

  let currentHeading = null;

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

    if (heading.tagName === "H2") {
      // Top-level entry
      rootList.appendChild(li);
      currentHeading = li;
    } else if (heading.tagName === "H3" && currentHeading) {
      // Nested under last H1
      let sublist = currentHeading.querySelector("ul");
      if (!sublist) {
        sublist = document.createElement("ul");
        currentHeading.appendChild(sublist);
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