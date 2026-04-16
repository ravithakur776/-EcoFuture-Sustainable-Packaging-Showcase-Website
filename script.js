document.addEventListener('DOMContentLoaded', () => {
  const statNumbers = document.querySelectorAll('.impact-stats .stat h3[data-target]');
  if (!statNumbers.length || !('IntersectionObserver' in window)) {
    return;
  }

  const animateValue = (element) => {
    const target = Number(element.dataset.target || 0);
    const suffix = element.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      const rounded = target <= 10 ? value.toFixed(1) : Math.round(value);
      element.textContent = `${rounded}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.textContent = `${target}${suffix}`;
      }
    };

    requestAnimationFrame(step);
  };

  const statsObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        animateValue(entry.target);
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.55
    }
  );

  statNumbers.forEach((number) => statsObserver.observe(number));
});
