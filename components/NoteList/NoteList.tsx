'use client';
import Link from 'next/link';
import css from './NoteList.module.css';
import type { Note } from '../../types/note';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { deleteNote, fetchNotes } from '../../lib/api';

const fetchNotesList = async (): Promise<Note[]> => {
  const res = await fetchNotes();
  return res.notes;
};

interface NoteListProps {
  notes?: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const { data } = useQuery<Note[]>({
    queryKey: ['notes'] as const,
    queryFn: fetchNotesList,
    enabled: !notes,
  });
  const list = notes ?? data ?? [];

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  if (!list.length) return null;

  return (
    <ul className={css.list}>
      {list.map((note: Note) => (
        <li key={note.id} className={css.listItem}>
          <div className={css.card}> 
            <Link href={`/notes/${note.id}`} className={css.link}> 
              <h2 className={css.title}>{note.title}</h2>
              <p className={css.tag}>#{note.tag}</p>
              <p className={css.content}>{note.content}</p>
            </Link>
            <div className={css.footer}>
              <button
                type="button"
                className={css.button}
                onClick={(e) => {
                  e.stopPropagation();
                  mutation.mutate(note.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}