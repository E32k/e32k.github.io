// MARK: External Links Class
document.querySelectorAll('a[href]').forEach(a => {
  if (a.getAttribute('href').startsWith('http'))
    a.classList.add('link-ext');
});

// MARK: Sidebar Tree Navigation & Mobile Drawer
const sidebarTree = document.getElementById("sidebar-tree");

document.addEventListener("DOMContentLoaded", async () => {
  if (!sidebarTree) return; // Prevent errors if the element isn't found

  const CURRENT_PAGE_PATH = window.location.pathname;

  const ICONS = {
    base:       "/images/tree/base.gif",
    folder:     "/images/tree/folder.gif",
    folderopen: "/images/tree/folderopen.gif",
    page:       "/images/tree/page.gif",
    line:       "/images/tree/line.gif",
    join:       "/images/tree/join.gif",
    joinbottom: "/images/tree/joinbottom.gif",
    plus:       "/images/tree/plus.gif",
    plusbottom: "/images/tree/plusbottom.gif",
    minus:      "/images/tree/minus.gif",
    minusbottom:"/images/tree/minusbottom.gif",
    empty:      "/images/tree/empty.gif"
  };

  // LocalStorage state helpers
  const getSavedState = (path) => localStorage.getItem("tree_expand_" + path);
  const setSavedState = (path, isOpen) => localStorage.setItem("tree_expand_" + path, isOpen ? "open" : "closed");

  // Primary Recursive Render Engine
  function renderTree(node, container, indentationArray = [], isLastChild = false) {
    if (node.disabled) return;

    const row = document.createElement('div');
    row.className = 'tree-row';

    indentationArray.forEach(isParentLast => {
      const guideImg = document.createElement('img');
      guideImg.src = isParentLast ? ICONS.empty : ICONS.line;
      row.appendChild(guideImg);
    });

    let toggleImg = null;
    let nodeImg = document.createElement('img');

    // Modern optional chaining syntax with nullish coalescing to safely filter children
    const validChildren = (node.children ?? []).filter(child => !child.disabled);
    const hasChildren = validChildren.length > 0;

    if (node.type === 'root') {
      nodeImg.src = ICONS.base;
    } else {
      if (hasChildren) {
        toggleImg = document.createElement('img');
        toggleImg.className = 'toggle-btn';
        toggleImg.src = isLastChild ? ICONS.plusbottom : ICONS.plus;
        row.appendChild(toggleImg);
        nodeImg.src = ICONS.folder;
      } else {
        const structuralWire = document.createElement('img');
        structuralWire.src = isLastChild ? ICONS.joinbottom : ICONS.join;
        row.appendChild(structuralWire);
        const isAFolderNode = node.path?.endsWith('/') || 'children' in node;
        nodeImg.src = isAFolderNode ? ICONS.folder : ICONS.page;
      }
    }

    row.appendChild(nodeImg);

    const label = document.createElement('a');
    label.className = 'node-label';
    label.textContent = node.title;

    if (node.path) {
      label.href = node.path;

      // open the folder when clicked
      if (hasChildren && node.type !== 'root') {
        label.onclick = () => {
          setSavedState(node.path, true);
        };
      }
    }

    if (node.type === 'root') label.classList.add('active-root');
    if (node.path === CURRENT_PAGE_PATH) label.classList.add('active-current');

    row.appendChild(label);
    container.appendChild(row);

    if (hasChildren) {
      const childUl = document.createElement('ul');
      childUl.className = 'nested-branch';
      container.appendChild(childUl);

      let containsActivePage = false;
      const scanForActiveElement = (targetNode) => {
        if (targetNode.disabled) return;
        if (targetNode.path === CURRENT_PAGE_PATH) containsActivePage = true;

        const subChildren = (targetNode.children ?? []).filter(c => !c.disabled);
        subChildren.forEach(scanForActiveElement);
      };
      validChildren.forEach(scanForActiveElement);

      validChildren.forEach((child, index) => {
        const lastNodeChildCheck = index === validChildren.length - 1;
        const childLi = document.createElement('li');
        childUl.appendChild(childLi);

        const passingArray = node.type === 'root' ? [] : [...indentationArray, isLastChild];
        renderTree(child, childLi, passingArray, lastNodeChildCheck);
      });

      const executeToggleAction = () => {
        if (node.type === 'root') return;

        const isCurrentlyOpen = childUl.classList.toggle('show-branch');
        setSavedState(node.path, isCurrentlyOpen);

        nodeImg.src = isCurrentlyOpen ? ICONS.folderopen : ICONS.folder;
        if (toggleImg) {
          toggleImg.src = isCurrentlyOpen
            ? (isLastChild ? ICONS.minusbottom : ICONS.minus)
            : (isLastChild ? ICONS.plusbottom  : ICONS.plus);
        }
      };

      if (node.type !== 'root' && toggleImg) {
        toggleImg.onclick = executeToggleAction;
      }

      const determineOpenState = node.type === 'root' ? true : (getSavedState(node.path) !== null ? getSavedState(node.path) === "open" : containsActivePage);

      if (determineOpenState) {
        childUl.classList.add('show-branch');
        if (node.type !== 'root') {
          nodeImg.src = ICONS.folderopen;
          if (toggleImg) toggleImg.src = isLastChild ? ICONS.minusbottom : ICONS.minus;
        }
      }
    }
  }

  // Fetch JSON data and instantly trigger base tree layout initialization
  try {
    const response = await fetch('/assets/sites.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const dataArray = await response.json();

    const rootWrapperNode = {
      title: "BeamNG.lua",
      type: "root",
      path: "/BeamNG.lua/",
      children: dataArray
    };

    renderTree(rootWrapperNode, sidebarTree);
  } catch (error) {
    console.error("Failed to load or parse site structure JSON:", error);
  }
});

const burger = document.getElementById("nav-burger")
const backdrop = document.getElementById("sites-backdrop")

let startX = 0
let startY = 0
let currentX = 0
let isDragging = false
let isHorizontal = false
let prevTransition = ""

// Only attach sidebar drawer event listeners if the burger menu exists (desktop vs mobile screens)
if (burger && backdrop && sidebarTree) {
  // toggle
  burger.addEventListener("click", () => {
    sidebarTree.classList.toggle("open")
    backdrop.classList.toggle("open")
  })

  // outside click
  backdrop.addEventListener("click", () => {
    sidebarTree.classList.remove("open")
    backdrop.classList.remove("open")
  })

  // drag to close touch gestures
  sidebarTree.addEventListener("touchstart", (e) => {
    if (!sidebarTree.classList.contains("open")) return

    const touch = e.touches[0]
    startX = touch.clientX
    startY = touch.clientY
    currentX = startX

    isDragging = true
    isHorizontal = false

    // get computed transition (not inline)
    prevTransition = getComputedStyle(sidebarTree).transition
  })

  sidebarTree.addEventListener("touchmove", (e) => {
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
        sidebarTree.style.transition = "none"
      } else {
        isDragging = false
        return
      }
    }

    if (deltaX < 0) {
      sidebarTree.style.transform = `translateX(${deltaX}px)`
    }
  })

  sidebarTree.addEventListener("touchend", () => {
    if (!isDragging) return
    isDragging = false

    const deltaX = currentX - startX
    const width = sidebarTree.offsetWidth

    // restore transition properly
    sidebarTree.style.transition = prevTransition

    if (deltaX < -width * 0.25) {
      // close
      sidebarTree.style.transform = "translateX(-100%)"
      backdrop.classList.remove("open")

      setTimeout(() => {
        sidebarTree.classList.remove("open")
        sidebarTree.style.transform = ""
      }, 250)
    } else {
      // snap back
      sidebarTree.style.transform = ""
    }
  })
}


// MARK: Overview headings (Table of Contents)
document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main");
  const toc = document.querySelector("#TableOfContents");
  const overview = document.querySelector("#overview");
  if (!main || !toc || !overview) return;

  const allHeadings = Array.from(main.querySelectorAll("h1, h2, h3, h4, h5"));

  const headings = allHeadings[0]?.tagName === "H1" ? allHeadings.slice(1) : allHeadings;

  if (!headings.length) return overview.remove();

  const links = new Map();
  const usedIds = new Map();

  const rootList = document.createElement("ul");
  toc.appendChild(rootList);

  const levelMap = { H1: 2, H2: 3, H3: 4, H4: 5, H5: 6 };
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
    while (stack.length > 1 && stack[stack.length - 1].level >= level)
      stack.pop();

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