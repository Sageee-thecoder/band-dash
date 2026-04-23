import { useEffect, useState } from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getFinance } from '../services/mockApi';

export default function FinancePage() {
  const [finance, setFinance] = useState([]);

  useEffect(() => {
    getFinance().then(setFinance);
  }, []);

  return (
    <section className="card">
      <h2>Revenue Analytics</h2>
      <p>Track publishing + partnership earnings over time.</p>
      <div style={{ width: '100%', height: 320 }}>
        <ResponsiveContainer>
          <LineChart data={finance}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#00e5ff" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
