// script.js (extended for form)

// Scroll animations (same as before)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-scale, .slide-in-left, .slide-in-right, .bounce-in')
  .forEach(el => observer.observe(el));

// Smooth scroll (optional for nav links)
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Simple form validation (basic)
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', e => {
    const inputs = form.querySelectorAll('input, select');
    let valid = true;

    inputs.forEach(input => {
      if (!input.checkValidity()) {
        input.style.borderColor = 'red';
        valid = false;
      } else {
        input.style.borderColor = '#ccc';
      }
    });

    if (!valid) {
      e.preventDefault();
      alert('Please fill in all required fields correctly.');
    }
  });
});
