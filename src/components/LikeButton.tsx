"use client";
import { toggleLikeMember } from "@/app/actions/likeActions";
import { useRouter } from "next/navigation";
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

type Props = {
	targerId: string;
	hasLiked: boolean;
};
export default function LikeButton({ targerId, hasLiked }: Props) {
	const router = useRouter();

	async function toggleLike() {
		await toggleLikeMember(targerId, hasLiked);
		router.refresh();
	}
	return (
		<div
			onClick={toggleLike}
			className="relative hover:opacity-80 transition cursor-pointer">
			<AiOutlineHeart
				size={28}
				className="fill-white absolute -top-[2px] -right-[2px]"
			/>
			<AiFillHeart
				size={24}
				className={hasLiked ? "fill-rose-500" : "fill-neutral-500/70"}
			/>
		</div>
	);
}
