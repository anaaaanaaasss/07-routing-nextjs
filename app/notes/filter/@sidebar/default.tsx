// app/notes/filter/@sidebar/default.tsx
import Link from 'next/link';

const tags = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'] as const;

export default function Sidebar() {
  return (
    <ul style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {tags.map(tag => (
        <li key={tag}>
          <Link href={`/notes/filter/${tag}`}>{tag}</Link>
        </li>
      ))}
    </ul>
  );
}