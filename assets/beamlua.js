// MARK: Sites navigation
const sites = document.getElementById("sites")
const burger = document.getElementById("nav-burger")

function isMobile() {
  return window.innerWidth < 1000
}

function createItem(item) {
  const el = document.createElement("div")
  el.textContent = item.title
  el.dataset.path = item.path

  if (item.children) {
    el.className = "folder"

    const children = document.createElement("div")
    children.className = "children"

    item.children.forEach(child => {
      children.appendChild(createItem(child))
    })

    el.appendChild(children)

    el.addEventListener("click", e => {
      e.stopPropagation()

      if (isMobile()) {
        el.classList.toggle("open")
      } else {
        location.href = item.path
      }
    })

  } else {
    el.className = "page"

    el.addEventListener("click", e => {
      e.stopPropagation()
      location.href = item.path
    })
  }

  return el
}

function findBranch(data, target, parents = []) {
  for (const item of data) {
    if (item.path === target) return [...parents, item]

    if (item.children) {
      const result = findBranch(item.children, target, [...parents, item])
      if (result) return result
    }
  }
  return null
}

function openCurrentPage(navData) {
  const path = window.location.pathname
  const branch = findBranch(navData, path)

  if (!branch) return

  branch.forEach(node => {
    const el = sites.querySelector(`[data-path="${node.path}"]`)
    if (!el) return

    el.classList.add("active")

    if (el.classList.contains("folder")) {
      el.classList.add("open")
    }
  })
}

// burger toggle
burger.addEventListener("click", () => {
  sites.classList.toggle("open")
})

async function initNav() {
  const res = await fetch("/assets/sites.json")
  const navData = await res.json()

  sites.innerHTML = ""

  navData.forEach(item => {
    sites.appendChild(createItem(item))
  })

  openCurrentPage(navData)
}

document.addEventListener("DOMContentLoaded", initNav)




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