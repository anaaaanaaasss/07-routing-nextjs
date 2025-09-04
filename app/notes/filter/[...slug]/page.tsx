import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/queryClient';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

type Props = {
  params: { slug?: string[] };
};

export default async function Page({ params }: Props) {
  const tag = params.slug?.[0] || 'All';
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', tag === 'All' ? '' : tag, '', 1],
    queryFn: () => fetchNotes(tag === 'All' ? '' : tag, 1, ''),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}