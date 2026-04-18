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
const backdrop = document.getElementById("sites-backdrop")

let startX = 0
let startY = 0
let currentX = 0
let isDragging = false
let isHorizontal = false
let prevTransition = ""

// toggle
burger.addEventListener("click", () => {
  sites.classList.toggle("open")
  backdrop.classList.toggle("open")
})

// outside click
backdrop.addEventListener("click", () => {
  sites.classList.remove("open")
  backdrop.classList.remove("open")
})

// drag to close
sites.addEventListener("touchstart", (e) => {
  if (!sites.classList.contains("open")) return

  const touch = e.touches[0]
  startX = touch.clientX
  startY = touch.clientY
  currentX = startX

  isDragging = true
  isHorizontal = false

  // get computed transition (not inline)
  prevTransition = getComputedStyle(sites).transition
})

sites.addEventListener("touchmove", (e) => {
  if (!isDragging) return

  const touch = e.touches[0]
  currentX = touch.clientX
  const currentY = touch.clientY

  const deltaX = currentX - startX
  const deltaY = currentY - startY

  // decide direction once
  if (!isHorizontal) {
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      isHorizontal = true
      sites.style.transition = "none"
    } else {
      isDragging = false
      return
    }
  }

  if (deltaX < 0) {
    sites.style.transform = `translateX(${deltaX}px)`
  }
})

sites.addEventListener("touchend", () => {
  if (!isDragging) return
  isDragging = false

  const deltaX = currentX - startX
  const width = sites.offsetWidth

  // restore transition properly
  sites.style.transition = prevTransition

  if (deltaX < -width * 0.25) {
    // close
    sites.style.transform = "translateX(-100%)"
    backdrop.classList.remove("open")

    setTimeout(() => {
      sites.classList.remove("open")
      sites.style.transform = ""
    }, 250)
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

  const allHeadings = Array.from(main.querySelectorAll("h1, h2, h3, h4, h5"));

  const headings = (
    allHeadings[0]?.tagName === "H1"
      ? allHeadings.slice(1)
      : allHeadings
  );

  if (!headings.length) return overview.remove();

  const links = new Map();
  const usedIds = new Map();

  const rootList = document.createElement("ul");
  toc.appendChild(rootList);

  const levelMap = { H1: 1, H2: 2, H3: 3, H4: 4, H5: 5 };

  // stack holds LI, not UL
  const stack = [{ level: 1, li: null, ul: rootList }];

  headings.forEach((heading) => {
    if (!heading.id) {
      const base = heading.textContent.toLowerCase().trim().replace(/&/g, "and").replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

      const count = usedIds.get(base) ?? 0;
      heading.id = count ? `${base}-${count}` : base;
      usedIds.set(base, count + 1);
    }

    const level = levelMap[heading.tagName] || 2;

    const link = document.createElement("a");
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent;

    const li = document.createElement("li");
    li.appendChild(link);

    // find correct parent level
    while (stack.length && stack[stack.length - 1].level >= level) {
      stack.pop();
    }

    const parent = stack[stack.length - 1];

    let ul;
    if (parent.li) {
      ul = parent.li.querySelector(":scope > ul");
      if (!ul) {
        ul = document.createElement("ul");
        parent.li.appendChild(ul);
      }
    } else {
      ul = rootList;
    }

    ul.appendChild(li);

    stack.push({ level, li, ul });

    links.set(heading, link);
  });

  function updateVisibleSections() {
    const top = scrollY;
    const bottom = top + innerHeight;

    headings.forEach((h, i) => {
      const start = h.offsetTop;
      const end = headings[i + 1]?.offsetTop ?? document.body.scrollHeight;

      const link = links.get(h);
      if (link) link.classList.toggle("is-visible", start < bottom && end > top);
    });
  }

  updateVisibleSections();
  addEventListener("scroll", updateVisibleSections, { passive: true });
  addEventListener("resize", updateVisibleSections);
});