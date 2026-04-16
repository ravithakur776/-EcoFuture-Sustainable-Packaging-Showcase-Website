document.addEventListener('DOMContentLoaded', () => {
  setupImpactCounters();
  setupCharts();
});

function setupImpactCounters() {
  const counters = document.querySelectorAll('.impact-card h3');
  if (!counters.length || !('IntersectionObserver' in window)) {
    return;
  }

  const parseCounter = (text) => {
    const numericMatch = text.match(/[\d.]+/);
    if (!numericMatch) {
      return null;
    }

    const numericValue = Number(numericMatch[0]);
    const suffix = text.replace(numericMatch[0], '');

    return { numericValue, suffix };
  };

  const animateCounter = (element) => {
    const parsed = parseCounter(element.textContent);
    if (!parsed) {
      return;
    }

    const { numericValue, suffix } = parsed;
    const duration = 1300;
    const startTime = performance.now();

    const step = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = numericValue * eased;
      const output = numericValue % 1 === 0 ? Math.round(currentValue) : currentValue.toFixed(1);
      element.textContent = `${output}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.textContent = `${numericValue}${suffix}`;
      }
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries, intersectionObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        animateCounter(entry.target);
        intersectionObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.4 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function setupCharts() {
  if (typeof Chart === 'undefined') {
    return;
  }

  const barCtx = document.getElementById('barChart');
  if (barCtx) {
    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: ['2022', '2023', '2024', '2025'],
        datasets: [
          {
            label: 'CO2 Saved (tons)',
            data: [150, 400, 650, 950],
            backgroundColor: ['#2d6a4f', '#3a7c5f', '#4a8f70', '#60a985'],
            borderRadius: 8,
            borderSkipped: false
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            labels: {
              color: '#1b4332'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(27, 67, 50, 0.12)'
            },
            ticks: {
              color: '#1b4332'
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#1b4332'
            }
          }
        }
      }
    });
  }

  const pieCtx = document.getElementById('pieChart');
  if (pieCtx) {
    new Chart(pieCtx, {
      type: 'doughnut',
      data: {
        labels: ['Compostable', 'Recyclable'],
        datasets: [
          {
            data: [55, 45],
            backgroundColor: ['#74c69d', '#40916c'],
            borderColor: '#f4f9f6',
            borderWidth: 4,
            hoverOffset: 8
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#1b4332'
            }
          }
        },
        cutout: '62%'
      }
    });
  }
}
