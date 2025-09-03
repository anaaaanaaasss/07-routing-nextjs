import NoteList from '@/components/NoteList/NoteList';
import { fetchNotes } from '@/lib/api';
import { Note } from '@/types/note';
import { notFound } from 'next/navigation';

type Props = {
  params: { slug?: string[] };
};

export default async function NotesPage({ params }: Props) {
  const tag = params.slug?.[0] || 'All';
  const data = await fetchNotes('', 1, tag);
  const notes: Note[] | undefined = data?.notes;

  if (!notes) return notFound();

  return <NoteList notes={notes} />;
}