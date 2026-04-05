// script.js for EcoFuture Impact Page Interactions

document.addEventListener("DOMContentLoaded", () => {
  // Fade-in on scroll
  const faders = document.querySelectorAll(".fade-in-up, .fade-in-scale, .bounce-in, .slide-in-left");
  const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("appear");
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

  // Gallery image hover zoom (optional effect for touch devices)
  const galleryImages = document.querySelectorAll(".gallery-grid img");
  galleryImages.forEach(img => {
    img.addEventListener("mouseover", () => {
      img.style.transform = "scale(1.05)";
    });
    img.addEventListener("mouseout", () => {
      img.style.transform = "scale(1)";
    });
  });

  // Call-to-action bounce effect
  const cta = document.querySelector(".call-to-action h2");
  if (cta) {
    cta.addEventListener("mouseenter", () => {
      cta.classList.add("bounce-in");
    });
    cta.addEventListener("animationend", () => {
      cta.classList.remove("bounce-in");
    });
  }
});


// script.js for EcoFuture Impact Page Interactions

document.addEventListener("DOMContentLoaded", () => {
  // Scroll animations
  const faders = document.querySelectorAll(".fade-in-up, .fade-in-scale, .bounce-in, .slide-in-left");
  const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("appear");
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

  // Gallery hover zoom
  const galleryImages = document.querySelectorAll(".gallery-grid img");
  galleryImages.forEach(img => {
    img.addEventListener("mouseover", () => {
      img.style.transform = "scale(1.05)";
    });
    img.addEventListener("mouseout", () => {
      img.style.transform = "scale(1)";
    });
  });

  // CTA bounce
  const cta = document.querySelector(".call-to-action h2");
  if (cta) {
    cta.addEventListener("mouseenter", () => {
      cta.classList.add("bounce-in");
    });
    cta.addEventListener("animationend", () => {
      cta.classList.remove("bounce-in");
    });
  }

  // Animated counters for impact numbers
  const counters = document.querySelectorAll(".impact-card h3");

  const countUp = (el, target) => {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 30);
    const interval = setInterval(() => {
      start += increment;
      if (start >= target) {
        el.textContent = target % 1 === 0 ? target : target.toFixed(1);
        clearInterval(interval);
      } else {
        el.textContent = target % 1 === 0 ? Math.floor(start) : start.toFixed(1);
      }
    }, 30);
  };

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(counter => {
          const valueText = counter.textContent.replace(/\D/g, "");
          const target = parseInt(valueText, 10);
          if (!counter.dataset.counted) {
            countUp(counter, target);
            counter.dataset.counted = true;
          }
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });

  if (counters.length) {
    counterObserver.observe(counters[0].parentElement);
  }
});



// script.js for EcoFuture Impact Page Interactions

document.addEventListener("DOMContentLoaded", () => {
  // Scroll animations
  const faders = document.querySelectorAll(".fade-in-up, .fade-in-scale, .bounce-in, .slide-in-left");
  const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("appear");
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

  // Gallery hover zoom
  const galleryImages = document.querySelectorAll(".gallery-grid img");
  galleryImages.forEach(img => {
    img.addEventListener("mouseover", () => {
      img.style.transform = "scale(1.05)";
    });
    img.addEventListener("mouseout", () => {
      img.style.transform = "scale(1)";
    });
  });

  // CTA bounce
  const cta = document.querySelector(".call-to-action h2");
  if (cta) {
    cta.addEventListener("mouseenter", () => {
      cta.classList.add("bounce-in");
    });
    cta.addEventListener("animationend", () => {
      cta.classList.remove("bounce-in");
    });
  }

  // Animated counters
  const counters = document.querySelectorAll(".impact-card h3");
  const countUp = (el, target) => {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 30);
    const interval = setInterval(() => {
      start += increment;
      if (start >= target) {
        el.textContent = target % 1 === 0 ? target : target.toFixed(1);
        clearInterval(interval);
      } else {
        el.textContent = target % 1 === 0 ? Math.floor(start) : start.toFixed(1);
      }
    }, 30);
  };

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(counter => {
          const valueText = counter.textContent.replace(/\D/g, "");
          const target = parseInt(valueText, 10);
          if (!counter.dataset.counted) {
            countUp(counter, target);
            counter.dataset.counted = true;
          }
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });

  if (counters.length) {
    counterObserver.observe(counters[0].parentElement);
  }

  // Bar chart for CO2 savings
  const barCtx = document.getElementById("barChart");
  if (barCtx) {
    new Chart(barCtx, {
      type: "bar",
      data: {
        labels: ["2022", "2023", "2024", "2025"],
        datasets: [{
          label: "CO2 Saved (tons)",
          data: [150, 400, 650, 950],
          backgroundColor: "#2d6a4f"
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  // Pie chart for material usage
  const pieCtx = document.getElementById("pieChart");
  if (pieCtx) {
    new Chart(pieCtx, {
      type: "pie",
      data: {
        labels: ["Compostable", "Recyclable"],
        datasets: [{
          data: [55, 45],
          backgroundColor: ["#74c69d", "#40916c"]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom"
          }
        }
      }
    });
  }
});
