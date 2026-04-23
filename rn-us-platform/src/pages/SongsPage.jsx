import { useEffect, useState } from 'react';
import SectionTable from '../components/SectionTable';
import { getSongs } from '../services/mockApi';

export default function SongsPage() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    getSongs().then((items) =>
      setSongs(items.map((song) => ({
        Title: song.title,
        Writer: song.writer,
        Stage: song.stage
      })))
    );
  }, []);

  return <SectionTable title="Songwriting & Publishing Pipeline" columns={['Title', 'Writer', 'Stage']} rows={songs} />;
}
