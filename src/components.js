const badgeVariants = {
  Available: {
    background: 'bg-status-available-bg',
    color: 'text-status-available',
    label: 'Available',
    nodeId: '3:2'
  },
  CheckedOut: {
    background: 'bg-status-out-bg',
    color: 'text-status-out',
    label: 'Checked out',
    nodeId: '3:4'
  },
  Repair: {
    background: 'bg-status-repair-bg',
    color: 'text-status-repair',
    label: 'Out for repair',
    nodeId: '3:6'
  },
  OnHold: {
    background: 'bg-status-hold-bg',
    color: 'text-status-hold',
    label: 'On hold',
    nodeId: '3:8'
  }
};

const renderBadge = (status = 'Available') => {
  const variant = badgeVariants[status] || badgeVariants.Available;
  const badge = document.createElement('span');
  badge.className = `inline-flex items-center rounded-full px-sm py-xs font-body text-xs font-medium leading-[1.3] ${variant.background} ${variant.color}`;
  badge.dataset.component = 'badge';
  badge.dataset.nodeId = variant.nodeId;
  badge.textContent = variant.label;
  return badge;
};

const renderFilterField = ({ type = 'Select', id, ariaLabel, options = [] }) => {
  const isSearch = type === 'Search';
  const field = document.createElement(isSearch ? 'input' : 'select');
  field.id = id;
  field.className = `h-12 w-full rounded-sm border border-border bg-surface-raised px-md font-body text-base outline-none focus-visible:border-focus ${isSearch ? 'text-ink-muted' : 'appearance-none pr-10 text-ink'}`;
  field.setAttribute('aria-label', ariaLabel);

  if (isSearch) {
    field.type = 'search';
    field.placeholder = 'Search tools';
  } else {
    options.forEach(({ value, label }) => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = label;
      field.appendChild(option);
    });
  }

  const fieldWrapper = document.createElement('div');
  fieldWrapper.className = 'relative w-60';
  fieldWrapper.dataset.component = 'filter-field';
  fieldWrapper.dataset.type = type;
  fieldWrapper.dataset.nodeId = isSearch ? '5:8' : '5:5';
  fieldWrapper.appendChild(field);

  if (!isSearch) {
    const chevron = document.createElement('img');
    chevron.src = 'images/filter-chevron.svg';
    chevron.alt = '';
    chevron.className = 'pointer-events-none absolute right-md top-1/2 -translate-y-1/2';
    fieldWrapper.appendChild(chevron);
  }

  return fieldWrapper;
};

window.SixthWardComponents = {
  renderBadge,
  renderFilterField
};
