import { useMemo, useState } from 'react';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const initialClasses = [
  { id: 1, day: 'Friday', start: '08:30', end: '09:15', name: 'Mathematics', room: '214' },
  { id: 2, day: 'Friday', start: '09:20', end: '10:05', name: 'English', room: '118' },
  { id: 3, day: 'Friday', start: '10:30', end: '11:15', name: 'Physics', room: '307' },
  { id: 4, day: 'Monday', start: '08:30', end: '09:15', name: 'Biology', room: '301' }
];
const initialCaptures = [
  { id: 1, text: 'Bring geography project tomorrow.', createdAt: 'Today · 07:18', pinned: true },
  { id: 2, text: 'Open physics notebook after school.', createdAt: 'Yesterday · 18:40', pinned: false }
];
const routine = [
  { time: '07:00', title: 'Wake', context: 'home' },
  { time: '07:35', title: 'Leave', context: 'home' },
  { time: '07:45', title: 'Bus', context: 'move' },
  { time: '08:20', title: 'School', context: 'school' },
  { time: '08:30', title: 'Mathematics', context: 'class' }
];
const mapStops = ['Entrance', 'Main Hall', 'Room 214', 'Stairs', 'Room 307', 'Bus stop'];

function Card({ children, className = '' }) {
  return <section className={`lumi-card ${className}`}>{children}</section>;
}

function TodayPanel({ captures }) {
  return (
    <div className="lumi-phone">
      <p className="eyebrow">good morning ♡</p>
      <h1>FRIDAY · JUL 31</h1>
      <Card>
        <span className="kicker">NEXT</span>
        <h2>📚 Mathematics</h2>
        <p>Room 214</p>
        <strong>in 23 minutes</strong>
      </Card>
      <Card>
        <span className="kicker">✦ RIGHT NOW</span>
        <p>{captures.find((capture) => capture.pinned)?.text}</p>
      </Card>
      <div className="companion">🪽 lumi<br /><span>“we've got this.”</span></div>
      <div className="tab-row"><span>○ Today</span><span>○ School</span><span>○ Capture</span><span>○ Anchor</span></div>
    </div>
  );
}

function SchoolPanel({ classes, addClass }) {
  const [draft, setDraft] = useState({ day: 'Friday', start: '', end: '', name: '', room: '' });
  const byDay = useMemo(() => days.map((day) => ({ day, classes: classes.filter((item) => item.day === day) })), [classes]);
  const submit = (event) => {
    event.preventDefault();
    if (!draft.name || !draft.start) return;
    addClass(draft);
    setDraft({ day: 'Friday', start: '', end: '', name: '', room: '' });
  };
  return (
    <div className="lumi-grid two">
      <Card>
        <h2>🎒 School timetable</h2>
        {byDay.map(({ day, classes: dayClasses }) => (
          <div className="day-block" key={day}>
            <h3>{day}</h3>
            {dayClasses.length ? dayClasses.map((item) => (
              <p key={item.id}><strong>{item.start}</strong> {item.name} <span>Room {item.room || '—'}</span></p>
            )) : <p className="muted">No classes yet.</p>}
          </div>
        ))}
      </Card>
      <Card>
        <h2>+ Add class</h2>
        <form onSubmit={submit}>
          <label>Name<input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} placeholder="Biology" /></label>
          <label>Room<input value={draft.room} onChange={(event) => setDraft({ ...draft, room: event.target.value })} placeholder="307" /></label>
          <label>Day<select value={draft.day} onChange={(event) => setDraft({ ...draft, day: event.target.value })}>{days.map((day) => <option key={day}>{day}</option>)}</select></label>
          <label>Start<input type="time" value={draft.start} onChange={(event) => setDraft({ ...draft, start: event.target.value })} /></label>
          <label>End<input type="time" value={draft.end} onChange={(event) => setDraft({ ...draft, end: event.target.value })} /></label>
          <button>Add to timetable</button>
        </form>
      </Card>
    </div>
  );
}

function CapturePanel({ captures, addCapture }) {
  const [text, setText] = useState('');
  const save = (event) => {
    event.preventDefault();
    if (!text.trim()) return;
    addCapture(text.trim());
    setText('');
  };
  return (
    <div className="lumi-grid two">
      <Card className="capture-card">
        <h2>📌 What do you need to remember?</h2>
        <form onSubmit={save}>
          <textarea value={text} onChange={(event) => setText(event.target.value)} placeholder="I need to..." rows="7" />
          <div className="action-row"><button type="button">🎤 voice later</button><button>✓ save</button></div>
        </form>
      </Card>
      <Card>
        <h2>Captured</h2>
        {captures.map((capture) => <p className="capture-item" key={capture.id}>{capture.text}<span>{capture.createdAt}</span></p>)}
      </Card>
    </div>
  );
}

function AnchorPanel() {
  return (
    <div className="anchor-screen">
      <div className="breathing-circle" />
      <h1>You're here.</h1>
      <p>You don't need to do anything.</p>
      <p>Look at the circle.</p>
    </div>
  );
}

function FuturePanel() {
  return (
    <div className="lumi-grid three">
      <Card><h2>🗺️ MVP 2 map</h2><p>{mapStops.join(' → ')}</p><strong>Room 214 to Room 307 · ~3 min</strong></Card>
      <Card><h2>🚌 Routine</h2>{routine.map((item) => <p key={item.time}><strong>{item.time}</strong> {item.title}</p>)}</Card>
      <Card><h2>🧠 MVP 3 brain</h2><p>Capture anything and Lumi can later sort it into tasks, ideas, events, people notes, goals, or journal entries—with permission.</p></Card>
      <Card><h2>🟡 Capacity mode</h2><p>Full · Low · Minimal · Anchor. The interface can prioritize instead of dumping everything.</p></Card>
      <Card><h2>📱 Context widget</h2><p>At home: leave in 18 min. At school: Physics · Room 307. At night: tomorrow's classes.</p></Card>
      <Card><h2>🔔 Notifications</h2><p>Class, important reminders, and gentle check-ins only. No spam.</p></Card>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState('today');
  const [classes, setClasses] = useState(initialClasses);
  const [captures, setCaptures] = useState(initialCaptures);
  const addClass = (draft) => setClasses((items) => [...items, { ...draft, id: Date.now() }]);
  const addCapture = (text) => setCaptures((items) => [{ id: Date.now(), text, createdAt: 'Just now', pinned: false }, ...items]);
  return (
    <main className="lumi-app">
      <header className="hero"><div><p className="eyebrow">🪽 LUMI MVP stack</p><h1>Calm context between you and the chaos.</h1><p>Local-first planner prototype covering Today, School, Capture, Companion, Anchor Mode, notifications, widget behavior, and MVP 2/3 evolution.</p></div><div className="widget"><strong>♡ LUMI</strong><p>NEXT<br />Mathematics · 08:30</p><p>📌 Geography project</p><p>✦ ONE THING<br />Open physics notebook.</p></div></header>
      <nav className="lumi-nav">{['today', 'school', 'capture', 'anchor', 'future'].map((item) => <button className={active === item ? 'selected' : ''} onClick={() => setActive(item)} key={item}>{item}</button>)}</nav>
      {active === 'today' && <TodayPanel captures={captures} />}
      {active === 'school' && <SchoolPanel classes={classes} addClass={addClass} />}
      {active === 'capture' && <CapturePanel captures={captures} addCapture={addCapture} />}
      {active === 'anchor' && <AnchorPanel />}
      {active === 'future' && <FuturePanel />}
    </main>
  );
}
