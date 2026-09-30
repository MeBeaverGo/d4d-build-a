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

const buttonVariants = {
  Primary: {
    Default: { background: 'bg-accent hover:bg-accent-hover', text: 'text-accent-ink', nodeId: '3:11', textNodeId: '3:12' },
    Hover: { background: 'bg-accent-hover', text: 'text-accent-ink', nodeId: '3:13', textNodeId: '3:14' },
    Focus: { background: 'bg-accent', text: 'text-accent-ink', border: 'border-2 border-focus', nodeId: '3:15', textNodeId: '3:16' },
    Disabled: { background: 'bg-disabled', text: 'text-disabled-ink', nodeId: '3:17', textNodeId: '3:18' }
  },
  Secondary: {
    Default: { background: 'bg-surface-raised hover:bg-surface border border-border', text: 'text-ink', nodeId: '3:19', textNodeId: '3:20' },
    Hover: { background: 'bg-surface border border-border', text: 'text-ink', nodeId: '3:21', textNodeId: '3:22' },
    Focus: { background: 'bg-surface-raised border-2 border-focus', text: 'text-ink', nodeId: '3:23', textNodeId: '3:24' },
    Disabled: { background: 'bg-surface border border-border', text: 'text-disabled-ink', nodeId: '3:25', textNodeId: '3:26' }
  }
};

const renderButton = ({
  label = 'Place hold',
  style = 'Primary',
  state = 'Default',
  type = 'button'
} = {}) => {
  const variant = buttonVariants[style]?.[state] || buttonVariants.Primary.Default;
  const button = document.createElement('button');
  button.type = type;
  button.className = `relative inline-flex items-center rounded-sm px-lg py-md font-body text-base font-semibold leading-[1.2] ${variant.background} ${variant.border || ''}`;
  button.disabled = state === 'Disabled';
  button.dataset.component = 'button';
  button.dataset.nodeId = variant.nodeId;

  const text = document.createElement('span');
  text.className = `whitespace-nowrap ${variant.text}`;
  text.dataset.nodeId = variant.textNodeId;
  text.textContent = label;
  button.appendChild(text);

  return button;
};

const renderEmptyState = ({ onClear } = {}) => {
  const emptyState = document.createElement('div');
  emptyState.className = 'flex w-full max-w-160 flex-col items-center gap-md rounded-card bg-surface py-xl';
  emptyState.dataset.component = 'empty-state';
  emptyState.dataset.nodeId = '5:19';

  const heading = document.createElement('p');
  heading.className = 'font-display text-lg font-semibold leading-[1.3] text-ink';
  heading.dataset.nodeId = '5:20';
  heading.textContent = 'No tools match these filters';

  const message = document.createElement('p');
  message.className = 'font-body text-base leading-[1.5] text-ink-muted';
  message.dataset.nodeId = '5:21';
  message.textContent = 'Try a different category, or clear the filters to see everything.';

  const clearButton = renderButton({ label: 'Clear filters', style: 'Secondary' });
  clearButton.dataset.nodeId = '5:22';
  clearButton.firstElementChild.dataset.nodeId = 'I5:22;3:20';
  clearButton.addEventListener('click', onClear);

  emptyState.append(heading, message, clearButton);
  return emptyState;
};

const renderAvailabilityToggle = ({ id = 'available-only', state = false } = {}) => {
  const toggle = document.createElement('label');
  toggle.className = 'relative inline-flex cursor-pointer items-center gap-sm';
  toggle.dataset.component = 'availability-toggle';

  const input = document.createElement('input');
  input.id = id;
  input.type = 'checkbox';
  input.checked = state;
  input.className = 'peer absolute size-5 opacity-0';

  const box = document.createElement('span');
  box.className = 'relative size-5 shrink-0 rounded-sm peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-focus';

  const label = document.createElement('span');
  label.className = 'whitespace-nowrap font-body text-base leading-[1.5] text-ink';
  label.textContent = 'Available only';

  const updateState = () => {
    const checked = input.checked;
    toggle.dataset.nodeId = checked ? '5:14' : '5:11';
    box.dataset.nodeId = checked ? '5:15' : '5:12';
    label.dataset.nodeId = checked ? '5:17' : '5:13';
    box.className = `relative size-5 shrink-0 rounded-sm peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-focus ${checked ? '' : 'border border-border bg-surface-raised'}`;
    box.replaceChildren();

    if (checked) {
      const checkmark = document.createElement('img');
      checkmark.src = 'images/availability-checked.svg';
      checkmark.alt = '';
      checkmark.className = 'absolute inset-0 size-full';
      box.appendChild(checkmark);
    }
  };

  input.addEventListener('change', updateState);
  toggle.append(input, box, label);
  updateState();

  return toggle;
};

const renderHeader = ({ href = 'index.html' } = {}) => {
  const header = document.createElement('header');
  header.className = 'flex w-full items-center justify-between whitespace-nowrap border-b border-border bg-surface-raised px-md py-lg md:px-xl';
  header.dataset.component = 'header';
  header.dataset.nodeId = '6:14';
  header.innerHTML = `
    <p class="font-display text-base md:text-lg font-semibold leading-[1.3] text-ink" data-node-id="6:15">
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
  renderButton,
  renderEmptyState,
  renderAvailabilityToggle,
  renderHeader,
  renderFilterField,
  renderToolCard
};
