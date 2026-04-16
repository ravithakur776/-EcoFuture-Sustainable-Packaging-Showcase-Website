document.addEventListener('DOMContentLoaded', () => {
  const cards = Array.from(document.querySelectorAll('#product-grid .feature-item'));
  const searchInput = document.getElementById('product-search');
  const filtersContainer = document.getElementById('product-filters');
  const status = document.getElementById('filter-status');

  if (!cards.length || !searchInput || !filtersContainer || !status) {
    return;
  }

  const typeLabels = {
    pouch: 'Pouches',
    roll: 'Roll Stock',
    mailer: 'Mailers',
    box: 'Boxes',
    wrap: 'Wraps',
    label: 'Labels',
    tube: 'Tubes',
    tape: 'Tape',
    cup: 'Cups'
  };

  const types = [...new Set(cards.map((card) => card.dataset.type).filter(Boolean))];
  const filters = [{ key: 'all', label: 'All Products' }, ...types.map((type) => ({ key: type, label: typeLabels[type] || type }))];

  let activeType = 'all';

  filters.forEach((filter) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `filter-btn${filter.key === 'all' ? ' is-active' : ''}`;
    button.dataset.filter = filter.key;
    button.textContent = filter.label;
    button.setAttribute('aria-pressed', filter.key === 'all' ? 'true' : 'false');
    filtersContainer.appendChild(button);
  });

  const applyFilters = () => {
    const query = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    cards.forEach((card) => {
      const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
      const matchesType = activeType === 'all' || card.dataset.type === activeType;
      const matchesQuery = !query || title.includes(query);
      const visible = matchesType && matchesQuery;

      card.classList.toggle('is-hidden', !visible);
      card.setAttribute('aria-hidden', visible ? 'false' : 'true');

      if (visible) {
        visibleCount += 1;
      }
    });

    status.textContent = `${visibleCount} of ${cards.length} products shown`;
  };

  filtersContainer.addEventListener('click', (event) => {
    const button = event.target.closest('.filter-btn');
    if (!button) {
      return;
    }

    activeType = button.dataset.filter;

    filtersContainer.querySelectorAll('.filter-btn').forEach((btn) => {
      const active = btn === button;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });

    applyFilters();
  });

  searchInput.addEventListener('input', applyFilters);

  applyFilters();
});
