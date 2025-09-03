import type { Note } from '@/types/note';
import axios from 'axios';

export async function fetchNotes(q = '', page = 1, tag?: string) {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN || process.env.NOTEHUB_TOKEN;

  const params: Record<string, string | number> = { page };
  if (q.trim()) {
    params.search = q;
  }
  if (tag && tag !== 'All') {
    params.tag = tag;
  }

const { data } = await axios.get<{ notes: Note[]; totalPages: number }>(
    'https://notehub-public.goit.study/api/notes',
    {
      params,
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
}
export async function createNote(payload: { title: string; content: string; tag: string }) {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN || process.env.NOTEHUB_TOKEN;
  const { data } = await axios.post<Note>(
    'https://notehub-public.goit.study/api/notes',
    payload,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
}
export async function deleteNote(id: string) {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN || process.env.NOTEHUB_TOKEN;
  const { data } = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
}
export async function fetchNoteById(id: string) {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN || process.env.NOTEHUB_TOKEN;
  const { data } = await axios.get<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
}