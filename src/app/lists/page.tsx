import ListsTab from "@/components/lists/ListsTab";
import React from "react";
import {
	fetchCurrentUserLikeIds,
	fetchLikedMembers,
} from "../actions/likeActions";

export default async function ListPage({
	searchParams,
}: {
	searchParams: { type: string };
}) {
	const likeIds = await fetchCurrentUserLikeIds();
	const members = await fetchLikedMembers(searchParams.type);
	return (
		<div>
			<ListsTab members={members} likeIds={likeIds} />
		</div>
	);
}
