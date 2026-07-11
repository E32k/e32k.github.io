// MARK: External Links Class
document.querySelectorAll('a[href]').forEach(a => {
  if (a.getAttribute('href').startsWith('http'))
    a.classList.add('link-ext');
});