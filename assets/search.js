function makeSnippet(text, position, queryWords) {
  // Replace headings with <b>
  text = text.replace(/<(h[1-6])>(.*?)<\/\1>/gi, "<b>$2</b>");

  // Split into paragraphs (double line breaks OR <p>)
  let paragraphs = text.split(/\n\s*\n|<p>/i);

  // Find which paragraph contains the match
  let matchIndex = 0;
  let charCount = 0;
  for (let i = 0; i < paragraphs.length; i++) {
    if (position < charCount + paragraphs[i].length) {
      matchIndex = i;
      break;
    }
    charCount += paragraphs[i].length + 2; // +2 for \n\n
  }

  // Decide how many paragraphs to include
  let snippet = paragraphs[matchIndex].trim();
  let wordCount = snippet.split(/\s+/).length;
  let start = matchIndex, end = matchIndex;

  while (wordCount < 30 && (start > 0 || end < paragraphs.length - 1)) {
    if (start > 0) {
      start--;
      snippet = paragraphs[start].trim() + "\n\n" + snippet;
      wordCount = snippet.split(/\s+/).length;
    }
    if (wordCount >= 30) break;
    if (end < paragraphs.length - 1) {
      end++;
      snippet += "\n\n" + paragraphs[end].trim();
      wordCount = snippet.split(/\s+/).length;
    }
  }

  // Highlight query words
  for (const q of queryWords) {
    snippet = snippet.replace(new RegExp(`(${q})`, "gi"), "<mark>$1</mark>");
  }

  // Ensure all HTML tags are closed
  snippet = closeTags(snippet);

  // Replace line breaks with <br> to keep formatting
  snippet = snippet.replace(/\n/g, "<br>");

  return snippet;
}

// Helper: close any unclosed HTML tags (simple version)
function closeTags(html) {
  const opened = [];
  html = html.replace(/<([a-z]+)(?: [^>]*)?>/gi, (m, tag) => {
    opened.push(tag);
    return m;
  });
  html = html.replace(/<\/([a-z]+)>/gi, (m, tag) => {
    const idx = opened.lastIndexOf(tag);
    if (idx !== -1) opened.splice(idx, 1);
    return m;
  });
  // Close any remaining
  for (let i = opened.length - 1; i >= 0; i--) {
    html += `</${opened[i]}>`;
  }
  return html;
}
