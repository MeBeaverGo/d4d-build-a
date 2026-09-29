const badgeVariants = {
  Available: {
    background: 'bg-status-available-bg',
    color: 'text-status-available',
    label: 'Available',
    nodeId: '3:2',
    textNodeId: '3:3'
  },
  CheckedOut: {
    background: 'bg-status-out-bg',
    color: 'text-status-out',
    label: 'Checked out',
    nodeId: '3:4',
    textNodeId: '3:5'
  },
  Repair: {
    background: 'bg-status-repair-bg',
    color: 'text-status-repair',
    label: 'Out for repair',
    nodeId: '3:6',
    textNodeId: '3:7'
  },
  OnHold: {
    background: 'bg-status-hold-bg',
    color: 'text-status-hold',
    label: 'On hold',
    nodeId: '3:8',
    textNodeId: '3:9'
  }
};

const renderBadge = (status = 'Available') => {
  const variant = badgeVariants[status] || badgeVariants.Available;
  const badge = document.createElement('div');
  badge.className = `relative inline-flex shrink-0 items-center rounded-full px-sm py-xs ${variant.background}`;
  badge.dataset.component = 'badge';
  badge.dataset.nodeId = variant.nodeId;

  const label = document.createElement('p');
  label.className = `whitespace-nowrap font-body text-xs font-medium leading-[1.3] ${variant.color}`;
  label.dataset.nodeId = variant.textNodeId;
  label.textContent = variant.label;
  badge.appendChild(label);

  return badge;
};

const renderHeader = ({ href = 'index.html' } = {}) => {
  const header = document.createElement('header');
  header.className = 'flex w-full items-center justify-between whitespace-nowrap border-b border-border bg-surface-raised px-md py-lg md:px-xl';
  header.dataset.component = 'header';
  header.dataset.nodeId = '6:14';
  header.innerHTML = `
    <p class="font-display text-lg font-semibold leading-[1.3] text-ink" data-node-id="6:15">
      Sixth Ward Tool Library
    </p>
    <a class="font-body text-base leading-[1.5] text-ink-muted" href="${href}" data-node-id="6:16">
      Catalog
    </a>
  `;
  return header;
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
  fieldWrapper.className = 'relative w-full md:w-60';
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

const renderToolCard = ({
  id,
  name,
  category,
  categoryLabel,
  availability = 'available',
  metaLine,
  href
}) => {
  const statusVariant = {
    available: 'Available',
    checked_out: 'CheckedOut',
    repair: 'Repair'
  }[availability] || 'Available';
  const nodeId = {
    available: '4:2',
    checked_out: '4:10',
    repair: '4:18'
  }[availability] || '4:2';

  const card = document.createElement('a');
  card.href = href || `tool.html?id=${encodeURIComponent(id)}`;
  card.className = 'group block w-full overflow-hidden rounded-card border border-border bg-surface-raised text-left transition-shadow hover:shadow-[0_6px_16px_rgba(28,27,25,0.08)] lg:w-80';
  card.dataset.component = 'tool-card';
  card.dataset.nodeId = nodeId;
  card.innerHTML = `
    <div class="flex h-60 w-full items-center justify-center overflow-hidden bg-surface">
      <img src="images/${category}.svg" alt="${categoryLabel} icon" class="h-16 w-16" />
    </div>
    <div class="flex w-full flex-col items-start gap-sm overflow-hidden bg-surface-raised p-md">
      <p class="font-body text-sm leading-[1.45] text-ink-muted">${categoryLabel}</p>
      <h2 class="font-display text-lg font-semibold leading-[1.3] text-ink">${name}</h2>
      <div data-badge-slot></div>
      <p class="font-body text-sm leading-[1.45] text-ink-muted">${metaLine}</p>
    </div>
  `;
  card.querySelector('[data-badge-slot]').replaceWith(
    renderBadge(statusVariant)
  );

  return card;
};

window.SixthWardComponents = {
  renderBadge,
  renderHeader,
  renderFilterField,
  renderToolCard
};
