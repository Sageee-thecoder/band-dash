import { useEffect, useState } from 'react';
import { addSubscriber, fetchNewsletters, fetchSubscribers, publishNewsletter } from '../services/api';

const initialNewsletter = {
  title: '',
  subject: '',
  html: '<h2>RN x US Update</h2><p>Write your newsletter content here...</p>',
  targetTiers: ['sub', 'vip']
};

export default function NewslettersPage() {
  const [newsletter, setNewsletter] = useState(initialNewsletter);
  const [subscriber, setSubscriber] = useState({ email: '', name: '', tier: 'sub' });
  const [history, setHistory] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [status, setStatus] = useState('');

  async function refresh() {
    const [items, subs] = await Promise.all([fetchNewsletters(), fetchSubscribers()]);
    setHistory(items);
    setSubscribers(subs);
  }

  useEffect(() => {
    refresh().catch(() => setStatus('Connect backend and login token first.'));
  }, []);

  const submitNewsletter = async (e) => {
    e.preventDefault();
    try {
      const result = await publishNewsletter(newsletter);
      setStatus(`Published. Sent ${result.sendResult.accepted}/${result.totalRecipients}.`);
      setNewsletter(initialNewsletter);
      await refresh();
    } catch (err) {
      setStatus(err.response?.data?.message || 'Failed to publish newsletter.');
    }
  };

  const submitSubscriber = async (e) => {
    e.preventDefault();
    try {
      await addSubscriber(subscriber);
      setSubscriber({ email: '', name: '', tier: 'sub' });
      setStatus('Subscriber added/updated.');
      await refresh();
    } catch (err) {
      setStatus(err.response?.data?.message || 'Failed to add subscriber.');
    }
  };

  return (
    <section>
      <h2>Newsletter Studio</h2>
      <p>Create and publish new newsletters to Subscribers + VIPs automatically.</p>

      <div className="grid two">
        <form className="card" onSubmit={submitNewsletter}>
          <h3>Publish Newsletter</h3>
          <label>Title</label>
          <input value={newsletter.title} onChange={(e) => setNewsletter({ ...newsletter, title: e.target.value })} required />

          <label>Subject</label>
          <input value={newsletter.subject} onChange={(e) => setNewsletter({ ...newsletter, subject: e.target.value })} required />

          <label>Audience</label>
          <select
            value={newsletter.targetTiers.join(',')}
            onChange={(e) => {
              const val = e.target.value;
              setNewsletter({
                ...newsletter,
                targetTiers: val === 'sub' ? ['sub'] : val === 'vip' ? ['vip'] : ['sub', 'vip']
              });
            }}
          >
            <option value="sub,vip">Subscribers + VIPs</option>
            <option value="sub">Subscribers only</option>
            <option value="vip">VIPs only</option>
          </select>

          <label>Newsletter HTML</label>
          <textarea rows="9" value={newsletter.html} onChange={(e) => setNewsletter({ ...newsletter, html: e.target.value })} required />

          <button type="submit">Publish & Send</button>
        </form>

        <div className="card">
          <h3>Add Subscriber</h3>
          <form onSubmit={submitSubscriber} className="stacked-form">
            <label>Email</label>
            <input type="email" value={subscriber.email} onChange={(e) => setSubscriber({ ...subscriber, email: e.target.value })} required />
            <label>Name</label>
            <input value={subscriber.name} onChange={(e) => setSubscriber({ ...subscriber, name: e.target.value })} />
            <label>Tier</label>
            <select value={subscriber.tier} onChange={(e) => setSubscriber({ ...subscriber, tier: e.target.value })}>
              <option value="sub">Subscriber</option>
              <option value="vip">VIP</option>
            </select>
            <button type="submit">Save Subscriber</button>
          </form>

          <h4>Active List ({subscribers.length})</h4>
          <ul className="simple-list">
            {subscribers.slice(0, 10).map((sub) => (
              <li key={sub._id}>{sub.email} — <strong>{sub.tier.toUpperCase()}</strong></li>
            ))}
          </ul>
        </div>
      </div>

      <section className="card">
        <h3>Recent Newsletters</h3>
        {history.length === 0 ? <p>No newsletters yet.</p> : (
          <ul className="simple-list">
            {history.map((item) => (
              <li key={item._id}>{item.title} — {item.sentCount} sent</li>
            ))}
          </ul>
        )}
      </section>

      {status && <p className="status">{status}</p>}
    </section>
  );
}
