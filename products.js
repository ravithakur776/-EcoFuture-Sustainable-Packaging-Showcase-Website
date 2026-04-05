// script.js with Filters, Search, and Quick View

// 1. Intersection Observer for animations
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

const animatedElements = document.querySelectorAll(
  '.fade-in, .fade-in-up, .fade-in-scale, .slide-in-left, .slide-in-right, .bounce-in'
);
animatedElements.forEach(el => observer.observe(el));

// 2. Smooth scrolling
const links = document.querySelectorAll('a[href^="#"]');
links.forEach(link => {
  link.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// 3. Active nav highlight
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// 4. Search filter for product names
const searchInput = document.getElementById("product-search");
if (searchInput) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    document.querySelectorAll(".feature-item").forEach(card => {
      const name = card.querySelector("h3").textContent.toLowerCase();
      card.style.display = name.includes(query) ? "flex" : "none";
    });
  });
}

// 5. Category filter
const filterButtons = document.querySelectorAll(".filter-btn");
if (filterButtons.length) {
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      document.querySelectorAll(".feature-item").forEach(card => {
        const type = card.dataset.type;
        card.style.display = filter === "all" || type === filter ? "flex" : "none";
      });
    });
  });
}

// 6. Quick view popup
const modal = document.createElement("div");
modal.id = "quick-view";
modal.style.display = "none";
modal.innerHTML = `
  <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;z-index:2000;">
    <div style="background:white;padding:2rem;max-width:500px;position:relative;border-radius:10px;box-shadow:0 0 20px rgba(0,0,0,0.2);">
      <span id="close-modal" style="position:absolute;top:10px;right:20px;cursor:pointer;font-size:1.5rem;">&times;</span>
      <div id="modal-content"></div>
    </div>
  </div>
`;
document.body.appendChild(modal);

const modalBox = document.getElementById("quick-view");
const modalContent = document.getElementById("modal-content");
const closeModal = document.getElementById("close-modal");

closeModal.addEventListener("click", () => {
  modalBox.style.display = "none";
});

// Apply click listener to each product card
const productCards = document.querySelectorAll(".feature-item");
productCards.forEach(card => {
  card.addEventListener("click", () => {
    const title = card.querySelector("h3").textContent;
    const desc = card.querySelector("p").textContent;
    const img = card.querySelector("img").src;
    modalContent.innerHTML = `<h2>${title}</h2><img src="${img}" style="width:100%;border-radius:8px;margin-top:1rem;"><p style="margin-top:1rem;">${desc}</p>`;
    modalBox.style.display = "flex";
  });
});
   

// products.js with autocomplete suggestions and live search

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("product-search");
  const products = document.querySelectorAll(".feature-item");

  // Create suggestion box
  const suggestionBox = document.createElement("ul");
  suggestionBox.id = "suggestion-box";
  suggestionBox.style.position = "absolute";
  suggestionBox.style.width = searchInput.offsetWidth + "px";
  suggestionBox.style.background = "white";
  suggestionBox.style.border = "1px solid #ccc";
  suggestionBox.style.listStyle = "none";
  suggestionBox.style.padding = "0";
  suggestionBox.style.margin = "0";
  suggestionBox.style.zIndex = 10;
  suggestionBox.style.display = "none";
  suggestionBox.style.maxHeight = "150px";
  suggestionBox.style.overflowY = "auto";
  searchInput.parentNode.appendChild(suggestionBox);

  const productNames = Array.from(products).map(p => p.querySelector("h3").textContent);

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    // Filter suggestions
    const suggestions = productNames.filter(name => name.toLowerCase().includes(query));

    suggestionBox.innerHTML = "";
    if (query && suggestions.length > 0) {
      suggestions.forEach(name => {
        const li = document.createElement("li");
        li.textContent = name;
        li.style.padding = "8px 12px";
        li.style.cursor = "pointer";
        li.addEventListener("click", () => {
          searchInput.value = name;
          suggestionBox.style.display = "none";
          filterProducts(name.toLowerCase());
        });
        suggestionBox.appendChild(li);
      });
      const rect = searchInput.getBoundingClientRect();
      suggestionBox.style.top = searchInput.offsetTop + searchInput.offsetHeight + "px";
      suggestionBox.style.left = searchInput.offsetLeft + "px";
      suggestionBox.style.display = "block";
    } else {
      suggestionBox.style.display = "none";
    }
    filterProducts(query);
  });

  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !suggestionBox.contains(e.target)) {
      suggestionBox.style.display = "none";
    }
  });

  function filterProducts(query) {
    products.forEach(p => {
      const name = p.querySelector("h3").textContent.toLowerCase();
      p.style.display = name.includes(query) ? "block" : "none";
    });
  }
});
