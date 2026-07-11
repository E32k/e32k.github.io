(() => {
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
})();