import NotesClient from './Notes.client';

type Props = {
  params: { slug?: string[] };
};

export default function Page({ params }: Props) {
  const tag = params.slug?.[0] || 'All';
  return <NotesClient tag={tag} />;
}