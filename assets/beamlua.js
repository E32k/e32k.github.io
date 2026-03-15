//MARK: Sites navigation
const sites = document.getElementById("sites");
const burger = document.getElementById("nav-burger");
const mobileContainer = document.getElementById("sites-container");

function isMobile() {
  return window.innerWidth < 768;
}

function closeAllFolders(container) {
  container.querySelectorAll(".folder.open").forEach(f => {
    f.classList.remove("open");
  });
}

function createItem(item) {
  const el = document.createElement("div");
  el.textContent = item.title;
  el.dataset.path = item.path;

  if (item.children) {
    el.className = "folder";

    const children = document.createElement("div");
    children.className = "children";

    item.children.forEach(child => {
      children.appendChild(createItem(child));
    });

    el.appendChild(children);

    el.addEventListener("click", e => {
      if (!isMobile()) {
        location.href = item.path;
        return;
      }

      if (!el.classList.contains("open")) {
        e.preventDefault();
        closeAllFolders(el.parentNode);
        el.classList.add("open");
      } else {
        location.href = item.path;
      }

      e.stopPropagation();
    });

  } else {
    el.className = "page";
    el.addEventListener("click", e => {
      e.stopPropagation();
      location.href = item.path;
    });
  }

  return el;
}

function buildNav(data, container) {
  container.innerHTML = ""; // clear existing
  data.forEach(item => {
    container.appendChild(createItem(item));
  });
}

function findBranch(data, target, parents = []) {
  for (const item of data) {
    if (item.path === target) return [...parents, item];
    if (item.children) {
      const result = findBranch(item.children, target, [...parents, item]);
      if (result) return result;
    }
  }
  return null;
}

function openCurrentPage(navData, container) {
  const path = window.location.pathname;
  const branch = findBranch(navData, path);
  if (!branch) return;

  branch.forEach(node => {
    const el = container.querySelector(`[data-path="${node.path}"]`);
    if (!el) return;
    el.classList.add("active");
    if (el.classList.contains("folder")) el.classList.add("open");
  });
}

// MARK: Burger menu toggle
burger.addEventListener("click", () => {
  if (!isMobile()) return;
  mobileContainer.style.display = mobileContainer.style.display === "block" ? "none" : "block";
});

// MARK: Initialize nav
async function initNav() {
  const res = await fetch("/assets/sites.json");
  const navData = await res.json();

  // Build desktop nav
  buildNav(navData, sites);
  openCurrentPage(navData, sites);

  // Build mobile overlay nav
  buildNav(navData, mobileContainer);
  openCurrentPage(navData, mobileContainer);
}

initNav();




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