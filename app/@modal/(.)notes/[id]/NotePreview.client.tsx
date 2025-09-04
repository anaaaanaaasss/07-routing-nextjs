'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import NoteForm from '@/components/NoteForm/NoteForm';

export default function NotePreviewClient({ noteId }: { noteId: string }) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        router.back();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [router]);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !note) return <div>Note not found</div>;

  return (
    <div>
      <NoteForm initialValue={note} disabled onCancel={() => router.back()} />
      <button onClick={() => router.back()}>X</button>
    </div>
  );
}