'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NoteList from '../NoteList/NoteList';

export function NotePage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', { q: '', page: 1 }],
    queryFn: () => fetchNotes('', 1),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data?.notes?.length) return <p>No notes found</p>;

  return (
    <main>
      <h1>Notes</h1>
      <NoteList notes={data.notes} />
    </main>
  );
}