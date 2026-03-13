//MARK: Save state of sites
//saves opened and closed sites when the user refreshes
//document.addEventListener('DOMContentLoaded', () => {
//  const detailsList = document.querySelectorAll('.sites details');
//  const saved = JSON.parse(localStorage.getItem('detailsState') || '{}');
//  detailsList.forEach((detail, index) => {
//    if (saved[index]) detail.open = true;
//    else detail.open = false;
//    detail.addEventListener('toggle', () => {
//      const state = {};
//      detailsList.forEach((d, i) => state[i] = d.open);
//      localStorage.setItem('detailsState', JSON.stringify(state));
//    });
//  });
//});




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



// Sites Browsing
const folders = document.querySelectorAll('.folder');

folders.forEach(folder => {
  const title = folder.querySelector('.folder-title');
  const link = title.querySelector('.sites-folder');

  let tappedOnce = false;

  title.addEventListener('click', e => {
    const isOpen = folder.classList.contains('open');

    // mobile double-click logic
    if(window.innerWidth <= 768) {
      if(!tappedOnce) {
        e.preventDefault();
        tappedOnce = true;
        setTimeout(() => tappedOnce = false, 400); // reset after 400ms
      } else {
        return; // second click will follow link normally
      }
    } else {
      e.preventDefault();
    }

    // close all others
    folders.forEach(f => f.classList.remove('open'));

    // toggle current folder
    if(!isOpen) folder.classList.add('open');
  });
});

// Highlight current page/folder
const currentURL = location.pathname;
folders.forEach(folder => {
  const folderLink = folder.querySelector('.sites-folder').getAttribute('href');
  if(currentURL.startsWith(folderLink)) {
    folder.classList.add('open');
    folder.querySelector('.folder-title').classList.add('active');
  }

  folder.querySelectorAll('.sites-page').forEach(page => {
    if(page.getAttribute('href') === currentURL) page.classList.add('active');
  });
});