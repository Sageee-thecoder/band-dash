import { useEffect, useMemo, useState } from 'react';
import { createEvent, fetchEvents } from '../services/api';

const members = [
  {
    key: 'manager',
    name: 'You (Manager)',
    roles: ['Vocalist', 'Songwriter', 'Manager'],
    focus: ['Fan emails', 'Collab/serious company comms', 'Publishing management']
  },
  {
    key: 'emine',
    name: 'Emine Avukat',
    roles: ['Guitarist', 'Songwriter', 'Vocalist'],
    focus: ['Guitar arrangements', 'Lyrics and topline', 'Vocal session takes']
  },
  {
    key: 'ali',
    name: 'Ali Mehmet Koç',
    roles: ['Vocalist', 'Drummer'],
    focus: ['Rhythm/drum patterns', 'Lead/backing vocals', 'Live rehearsal execution']
  }
];

const initialEvent = {
  title: '',
  date: '',
  type: 'rehearsal',
  attendees: ['all'],
  notes: ''
};

export default function TeamDashboardsPage() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState(initialEvent);
  const [status, setStatus] = useState('');

  async function refreshEvents() {
    const data = await fetchEvents();
    setEvents(data);
  }

  useEffect(() => {
    refreshEvents().catch(() => setStatus('Connect backend + login token to sync calendar.'));
  }, []);

  const submitEvent = async (e) => {
    e.preventDefault();
    try {
      await createEvent({ ...form, attendees: form.attendees });
      setForm(initialEvent);
      setStatus('Event added to shared calendar.');
      await refreshEvents();
    } catch (err) {
      setStatus(err.response?.data?.message || 'Could not create event.');
    }
  };

  const grouped = useMemo(() => {
    return members.reduce((acc, member) => {
      acc[member.key] = events.filter((event) => {
        const attendees = event.attendees || ['all'];
        return attendees.includes('all') || attendees.includes(member.key);
      });
      return acc;
    }, {});
  }, [events]);

  return (
    <section>
      <h2>Team Dashboards + Shared Calendar</h2>
      <p>Each member has a dedicated dashboard block. All event entries sync into one collaborative calendar.</p>

      <div className="grid three">
        {members.map((member) => (
          <article key={member.key} className="card">
            <h3>{member.name}</h3>
            <p><strong>Roles:</strong> {member.roles.join(' · ')}</p>
            <p><strong>Focus:</strong></p>
            <ul className="simple-list">
              {member.focus.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <h4>Upcoming for {member.name.split(' ')[0]}</h4>
            <ul className="simple-list">
              {(grouped[member.key] || []).slice(0, 5).map((event) => (
                <li key={event._id || `${event.title}-${event.date}`}>
                  {new Date(event.date).toLocaleDateString()} — {event.title}
                </li>
              ))}
              {(grouped[member.key] || []).length === 0 && <li>No events yet.</li>}
            </ul>
          </article>
        ))}
      </div>

      <section className="card">
        <h3>Add Collaborative Event</h3>
        <form className="event-grid" onSubmit={submitEvent}>
          <div>
            <label>Title</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </div>
          <div>
            <label>Date</label>
            <input type="datetime-local" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
          </div>
          <div>
            <label>Type</label>
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <option value="rehearsal">Rehearsal</option>
              <option value="recording">Recording</option>
              <option value="meeting">Meeting</option>
              <option value="performance">Performance</option>
              <option value="release">Release</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label>Attendees</label>
            <select
              value={form.attendees[0]}
              onChange={(e) => setForm({ ...form, attendees: [e.target.value] })}
            >
              <option value="all">All Members</option>
              <option value="manager">Manager</option>
              <option value="emine">Emine Avukat</option>
              <option value="ali">Ali Mehmet Koç</option>
            </select>
          </div>
          <div className="full">
            <label>Notes</label>
            <textarea rows="4" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          </div>
          <div className="full">
            <button type="submit">Add Event</button>
          </div>
        </form>
      </section>

      <section className="card">
        <h3>Shared Event Calendar Feed</h3>
        <ul className="simple-list">
          {events.map((event) => (
            <li key={event._id || `${event.title}-${event.date}`}>
              {new Date(event.date).toLocaleString()} — <strong>{event.title}</strong> ({event.type})
            </li>
          ))}
          {events.length === 0 && <li>No events scheduled yet.</li>}
        </ul>
      </section>

      {status && <p className="status">{status}</p>}
    </section>
  );
}
