import { useEffect, useState } from 'react';
import SectionTable from '../components/SectionTable';
import { getTasks } from '../services/mockApi';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks().then((items) =>
      setTasks(items.map((task) => ({
        Task: task.title,
        Owner: task.owner,
        Due: task.due
      })))
    );
  }, []);

  return <SectionTable title="Team Execution Board" columns={['Task', 'Owner', 'Due']} rows={tasks} />;
}
