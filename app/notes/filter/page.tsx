import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "@/app/notes/filter/[...slug]/Notes.client";
export default async function NotesPage() {
  const queryClient = new QueryClient();
  const category = undefined;
  await queryClient.prefetchQuery({
    queryKey: ["notes", { search: "", page: 1, category }],
    queryFn: () => fetchNotes("", 1, undefined, category),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient category={category} /><NotesClient category={category} />
    </HydrationBoundary>
  );
}