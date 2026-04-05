// script.js

// Scroll-triggered animations using Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, {
  threshold: 0.15
});

// Select all animation classes to observe
const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-scale, .slide-in-left, .slide-in-right, .bounce-in');
animatedElements.forEach(el => observer.observe(el));

// Optional: Smooth scroll for internal links
const links = document.querySelectorAll('a[href^="#"]');
links.forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
