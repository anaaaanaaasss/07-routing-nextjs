import { useRouter } from 'next/navigation';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  value: string;
  onSearch: (value: string) => void;
}

export default function SearchBox({ value, onSearch }: SearchBoxProps) {
  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      router.push(`/notes/filter/All?search=${value}`);
    }
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={value}
      onChange={(e) => onSearch(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
}
