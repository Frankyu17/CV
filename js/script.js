// main.js
// Add any interactive behavior here.
// Example: smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(link =>
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  })
);
