'use client';

import React from 'react';
import Modal from '@/components/Modal/Modal';
import NotePreview from '@/components/NotePreview/NotePreview';

export default function NoteModalPage({ params }: { params: { id: string } }) {
  return (
    <Modal onClose={() => window.history.back()}>
      <NotePreview noteId={params.id} />
    </Modal>
  );
}