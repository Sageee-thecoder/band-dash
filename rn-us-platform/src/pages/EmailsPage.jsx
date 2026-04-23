import { useEffect, useState } from 'react';
import SectionTable from '../components/SectionTable';
import { getEmails } from '../services/mockApi';

export default function EmailsPage() {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    getEmails().then((items) =>
      setEmails(items.map((i) => ({
        From: i.from,
        Subject: i.subject,
        Priority: i.priority,
        Status: i.status
      })))
    );
  }, []);

  return <SectionTable title="Inbox Operations" columns={['From', 'Subject', 'Priority', 'Status']} rows={emails} />;
}
