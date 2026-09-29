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

window.SixthWardComponents = {
  renderBadge
};
