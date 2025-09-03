import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

export default async function NotesPage() {
  const qc = new QueryClient();
  await qc.prefetchQuery<{ notes: import('@/types/note').Note[]; totalPages: number}>({
    queryKey: ['notes'],
    queryFn: () => fetchNotes(),
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NotesClient />
    </HydrationBoundary>
  );
}