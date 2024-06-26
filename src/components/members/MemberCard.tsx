"use client";
import { calculateAge } from "@/lib/util";
import { Card, CardFooter, Image } from "@nextui-org/react";
import { Member } from "@prisma/client";
import Link from "next/link";
// import Image from "next/image";
import React from "react";
import LikeButton from "../LikeButton";

type Props = {
	member: Member;
	likeIds: string[];
};
export default function MemberCard({ member, likeIds }: Props) {
	const hasLiked = likeIds.includes(member.userId);
	const preventLinkAction = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
	};

	return (
		<Card
			fullWidth
			as={Link}
			href={`/members/${member.userId}`}
			isPressable>
			<Image
				isZoomed
				alt={member.name}
				width={"100%"}
				src={member.image || "/images/user.png"}
				className="aspect-square object-cover"
			/>
			<div onClick={preventLinkAction}>
				<div className="absolute top-3 right-3 z-50 ">
					<LikeButton targerId={member.userId} hasLiked={hasLiked} />
				</div>
			</div>
			<CardFooter className="flex justify-start absolute bottom-0 z-10 bg-black dark overflow-hidden bg-dark-gradient ">
				<div className="flex flex-col text-white">
					<span className="font-semibold">
						{member.name}, {calculateAge(member.dateOfBirth)}
					</span>
					<span className="text-sm">{member.city}</span>
				</div>
			</CardFooter>
		</Card>
	);
}
