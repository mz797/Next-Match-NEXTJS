import { getMemberByUserId } from "@/app/actions/memberActions";
import MemberSidebar from "@/components/members/MemberSidebar";
import { Card } from "@nextui-org/react";
import { notFound } from "next/navigation";
import React, { ReactNode } from "react";

type Props = {
	children: ReactNode;
	params: { userId: string };
};
export default async function Layout({ children, params }: Props) {
	const member = await getMemberByUserId(params.userId);
	if (!member) return notFound();
	return (
		<div className="grid grid-cols-12 gap-5 h-[80vh]">
			{" "}
			<div className="col-span-3">
				<MemberSidebar member={member} />
			</div>
			<div className="col-span-9">
				<Card className="w-full mt-10 h-[80vh]">{children}</Card>
			</div>
		</div>
	);
}
