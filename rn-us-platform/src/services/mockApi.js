const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getDashboardMetrics() {
  await delay(150);
  return {
    unreadEmails: 27,
    openDeals: 8,
    songsInProgress: 14,
    monthlyRevenue: 18350,
    pendingTasks: 11
  };
}

export async function getEmails() {
  await delay(120);
  return [
    { from: 'fanclub@support.com', subject: 'Tour date request', priority: 'Medium', status: 'Open' },
    { from: 'labelA@musicbiz.com', subject: 'Sync licensing opportunity', priority: 'High', status: 'Pending Reply' },
    { from: 'indieartist@collab.io', subject: 'Feature collaboration pitch', priority: 'High', status: 'Reviewed' }
  ];
}

export async function getSongs() {
  await delay(120);
  return [
    { title: 'Night Frequency', writer: 'Manager + Member A', stage: 'Draft' },
    { title: 'Ocean Glass', writer: 'Member B', stage: 'Melody' },
    { title: 'Saturn Echo', writer: 'Group', stage: 'Ready for Publish' }
  ];
}

export async function getDeals() {
  await delay(120);
  return [
    { partner: 'Aurora Records', type: 'Distribution', value: '$12,000', status: 'Negotiation' },
    { partner: 'Pulse Energy', type: 'Brand Campaign', value: '$30,000', status: 'Draft Contract' }
  ];
}

export async function getTasks() {
  await delay(120);
  return [
    { title: 'Reply to top 10 fan emails', owner: 'Manager', due: '2026-04-24' },
    { title: 'Finalize chorus arrangement', owner: 'Member A', due: '2026-04-25' },
    { title: 'Upload stems for publishing', owner: 'Member B', due: '2026-04-26' }
  ];
}

export async function getFinance() {
  await delay(150);
  return [
    { month: 'Jan', revenue: 15000 },
    { month: 'Feb', revenue: 16400 },
    { month: 'Mar', revenue: 17100 },
    { month: 'Apr', revenue: 18350 }
  ];
}
