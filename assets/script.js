document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector("#sidebar ul");
  const items = sidebar.querySelectorAll("li");

  items.forEach((li, index) => {
    // Check if next item is deeper
    const next = items[index + 1];
    if (next && parseInt(next.className.match(/depth-(\d+)/)[1]) > parseInt(li.className.match(/depth-(\d+)/)[1])) {
      // This is a folder
      li.classList.add("folder");
      const toggle = document.createElement("span");
      toggle.textContent = "▶ ";
      toggle.style.cursor = "pointer";
      toggle.style.userSelect = "none";
      li.prepend(toggle);

      toggle.addEventListener("click", (e) => {
        e.stopPropagation();
        let currentDepth = parseInt(li.className.match(/depth-(\d+)/)[1]);
        let nextIndex = index + 1;
        while (nextIndex < items.length) {
          let nextItem = items[nextIndex];
          let nextDepth = parseInt(nextItem.className.match(/depth-(\d+)/)[1]);
          if (nextDepth <= currentDepth) break;
          nextItem.style.display = nextItem.style.display === "none" ? "block" : "none";
          nextIndex++;
        }
        toggle.textContent = toggle.textContent === "▶ " ? "▼ " : "▶ ";
      });

      // Start collapsed
      let nextIndex = index + 1;
      let currentDepth = parseInt(li.className.match(/depth-(\d+)/)[1]);
      while (nextIndex < items.length) {
        let nextItem = items[nextIndex];
        let nextDepth = parseInt(nextItem.className.match(/depth-(\d+)/)[1]);
        if (nextDepth <= currentDepth) break;
        nextItem.style.display = "none";
        nextIndex++;
      }
    }
  });
});
