import { NavLink, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import EmailsPage from './pages/EmailsPage';
import SongsPage from './pages/SongsPage';
import DealsPage from './pages/DealsPage';
import TasksPage from './pages/TasksPage';
import FinancePage from './pages/FinancePage';
import NewslettersPage from './pages/NewslettersPage';
import TeamDashboardsPage from './pages/TeamDashboardsPage';

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/emails', label: 'Fan & Collab Emails' },
  { to: '/songs', label: 'Song Pipeline' },
  { to: '/deals', label: 'Collabs & Business' },
  { to: '/tasks', label: 'Team Tasks' },
  { to: '/finance', label: 'Publishing & Revenue' },
  { to: '/newsletters', label: 'Newsletters' },
  { to: '/team', label: 'Team Dashboards' }
];

export default function App() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <h1>RN × US</h1>
        <p className="subtitle">Business Manager Console</p>
        <nav>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="content">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/emails" element={<EmailsPage />} />
          <Route path="/songs" element={<SongsPage />} />
          <Route path="/deals" element={<DealsPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/finance" element={<FinancePage />} />
          <Route path="/newsletters" element={<NewslettersPage />} />
          <Route path="/team" element={<TeamDashboardsPage />} />
        </Routes>
      </main>
    </div>
  );
}
