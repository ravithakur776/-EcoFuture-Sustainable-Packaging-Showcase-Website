document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.testimonial-carousel');
  if (!carousel) {
    return;
  }

  const track = carousel.querySelector('.testimonial-track');
  const slides = Array.from(carousel.querySelectorAll('.testimonial-slide'));
  const prevButton = carousel.querySelector('[data-action="prev"]');
  const nextButton = carousel.querySelector('[data-action="next"]');
  const dotsContainer = carousel.querySelector('.carousel-dots');

  if (!track || !slides.length || !prevButton || !nextButton || !dotsContainer) {
    return;
  }

  let currentIndex = 0;
  let autoplayTimer;

  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot';
    dot.type = 'button';
    dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateCarousel();
      restartAutoplay();
    });
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.children);

  const updateCarousel = () => {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot, index) => {
      const isActive = index === currentIndex;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  };

  const moveBy = (direction) => {
    currentIndex = (currentIndex + direction + slides.length) % slides.length;
    updateCarousel();
    restartAutoplay();
  };

  prevButton.addEventListener('click', () => moveBy(-1));
  nextButton.addEventListener('click', () => moveBy(1));

  carousel.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      moveBy(-1);
    } else if (event.key === 'ArrowRight') {
      moveBy(1);
    }
  });

  const startAutoplay = () => {
    autoplayTimer = window.setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    }, 5200);
  };

  const stopAutoplay = () => {
    window.clearInterval(autoplayTimer);
  };

  const restartAutoplay = () => {
    stopAutoplay();
    startAutoplay();
  };

  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);

  updateCarousel();
  startAutoplay();
});
