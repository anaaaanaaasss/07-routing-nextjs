'use client';

import React, { useEffect } from 'react';
import { fetchNoteById } from '@/lib/api';
import { Note } from '@/types/note';
import css from './NotePreview.module.css';

type NotePreviewProps = {
  noteId: string;
};

export default function NotePreview({ noteId }: NotePreviewProps) {
  const [note, setNote] = React.useState<Note | null>(null);

  useEffect(() => {
    async function fetchNote() {
      try {
        const data = await fetchNoteById(noteId);
        setNote(data);
      } catch (error) {
        console.error('Error fetching note:', error);
      }
    }

    fetchNote();
  }, [noteId]);

  if (!note) {
    return <div className={css.loading}>Loading...</div>;
  }

  return (
    <div className={css.note}>
      <h2 className={css.title}>{note.title}</h2>
      <p className={css.text}>{note.content}</p>
      <p className={css.date}>{new Date(note.createdAt).toLocaleString()}</p>
    </div>
  );
}