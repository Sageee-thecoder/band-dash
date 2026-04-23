import { useEffect, useState } from 'react';
import KpiCard from '../components/KpiCard';
import { getDashboardMetrics } from '../services/mockApi';

export default function DashboardPage() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    getDashboardMetrics().then(setMetrics);
  }, []);

  if (!metrics) return <p>Loading dashboard...</p>;

  return (
    <section>
      <h2>Business Overview</h2>
      <div className="grid four">
        <KpiCard label="Unread Emails" value={metrics.unreadEmails} />
        <KpiCard label="Open Deals" value={metrics.openDeals} />
        <KpiCard label="Songs In Progress" value={metrics.songsInProgress} />
        <KpiCard label="Pending Tasks" value={metrics.pendingTasks} />
      </div>
      <div className="card">
        <h3>Monthly Revenue</h3>
        <p className="big-money">${metrics.monthlyRevenue.toLocaleString()}</p>
      </div>
    </section>
  );
}
