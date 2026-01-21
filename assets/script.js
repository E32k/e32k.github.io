document.addEventListener("DOMContentLoaded", () => {
  const nodes = [...document.querySelectorAll(".node")];

  nodes.forEach((node, i) => {
    if (!node.classList.contains("folder")) return;

    const arrow = node.querySelector(".arrow");
    const baseDepth = getDepth(node);

    let j = i + 1;
    const children = [];

    while (j < nodes.length && getDepth(nodes[j]) > baseDepth) {
      children.push(nodes[j]);
      j++;
    }

    // start collapsed
    children.forEach(c => c.style.display = "none");

    arrow.addEventListener("click", e => {
      e.stopPropagation();
      const open = arrow.textContent === "▼";
      arrow.textContent = open ? "▶" : "▼";
      children.forEach(c => c.style.display = open ? "none" : "block");
    });
  });

  function getDepth(el) {
    return [...el.classList]
      .find(c => c.startsWith("depth-"))
      .split("-")[1] | 0;
  }
});
