import { useEffect, useState } from 'react';
import SectionTable from '../components/SectionTable';
import { getDeals } from '../services/mockApi';

export default function DealsPage() {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    getDeals().then((items) =>
      setDeals(items.map((deal) => ({
        Partner: deal.partner,
        Type: deal.type,
        Value: deal.value,
        Status: deal.status
      })))
    );
  }, []);

  return <SectionTable title="Collaboration & Business Deals" columns={['Partner', 'Type', 'Value', 'Status']} rows={deals} />;
}
