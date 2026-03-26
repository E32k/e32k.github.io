// MARK: External Links Class
document.querySelectorAll('a[href]').forEach(a => {
  if (a.getAttribute('href').startsWith('http'))
    a.classList.add('link-ext');
});


// MARK: Sites navigation
const sites = document.getElementById("sites")

document.addEventListener("DOMContentLoaded", () => {
  const current = window.location.pathname.replace(/\/+$/, "")
  const links = sites.querySelectorAll("a")

  links.forEach(link => {
    const href = link.getAttribute("href").replace(/\/+$/, "")

    if (href === current) {
      // Add active class to the current page link
      link.classList.add("active")

      // Add open class only to the top-level folder
      let parent = link.closest(".sites-folder")
      if (parent) { parent.classList.add("open") }
    }
  })
})

const burger = document.getElementById("nav-burger")

let startX = 0
let currentX = 0
let isDragging = false
let prevTransition = ""

// toggle
burger.addEventListener("click", () => { sites.classList.toggle("open") })

// close on outside click
document.addEventListener("click", (e) => {
  const isClickInside = sites.contains(e.target) || burger.contains(e.target)
  if (!isClickInside) {
    sites.classList.remove("open")
  }
})

// drag to close
sites.addEventListener("touchstart", (e) => {
  if (!sites.classList.contains("open")) return

  startX = e.touches[0].clientX
  isDragging = true

  prevTransition = sites.style.transition
  sites.style.transition = "none"
})

sites.addEventListener("touchmove", (e) => {
  if (!isDragging) return

  currentX = e.touches[0].clientX
  let deltaX = currentX - startX

  if (deltaX < 0) {
    sites.style.transform = `translateX(${deltaX}px)`
  }
})

sites.addEventListener("touchend", () => {
  if (!isDragging) return
  isDragging = false

  let deltaX = currentX - startX

  // restore transition
  sites.style.transition = prevTransition || ""

  if (deltaX < -80) {
    // close
    sites.style.transform = "translateX(-100%)"

    setTimeout(() => {
      sites.classList.remove("open")
      sites.style.transform = ""
    }, 250) // match CSS transition
  } else {
    // snap back
    sites.style.transform = ""
  }
})



// MARK: Overview headings (Table of Contents)
document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main");
  const toc = document.querySelector("#TableOfContents");
  const overview = document.querySelector("#overview");
  if (!main || !toc || !overview) return;

  const headings = Array.from(main.querySelectorAll("h2, h3"));

  if (headings.length === 0) {
    overview.remove();
    return;
  }

  const links = new Map();
  const usedIds = new Map();

  // Root list
  const rootList = document.createElement("ul");
  toc.appendChild(rootList);

  let currentHeading = null;

  headings.forEach((heading) => {
    // Ensure unique IDs
    if (!heading.id) {
      const base = heading.textContent
        .toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

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
      const end = headings[i + 1]?.offsetTop ?? document.body.scrollHeight;
      const isVisible = start < viewportBottom && end > viewportTop;
      const link = links.get(heading);
      if (link) link.classList.toggle("is-visible", isVisible);
    });
  }

  updateVisibleSections();
  window.addEventListener("scroll", updateVisibleSections, { passive: true });
  window.addEventListener("resize", updateVisibleSections);
});