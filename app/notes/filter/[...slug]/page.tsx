import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query"
import { fetchNotes, getCategories, Tags } from "@/lib/api"
import NotesClient from "./Notes.client"

interface NotesFilterProps {
	params: Promise<{ slug: Tags }>
}

export const dynamicParams = false
export const revalidate = 900

export async function generateStaticParams() {
	const categories = getCategories
	return categories.map(category => ({ slug: [category] }))
}

export default async function NotesFilter({ params }: NotesFilterProps) {
	const queryClient = new QueryClient()
	const { slug } = await params
	const category: Tags[number] | undefined = slug[0] === "All" ? undefined : slug[0];

	await queryClient.prefetchQuery({
		queryKey: ["notes", { search: "", page: 1, category }],
		queryFn: () => fetchNotes("", 1, category),
	})

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<NotesClient category={category} />
		</HydrationBoundary>
	)
}