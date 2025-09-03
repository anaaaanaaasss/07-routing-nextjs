'use client';

import NotePreview from '@/components/NotePreview/NotePreview';

export default function NotePreviewClient({ noteId }: { noteId: string }) {
  return <NotePreview noteId={noteId} />;
}