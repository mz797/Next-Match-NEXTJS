import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { FaRegSmile } from "react-icons/fa";

export default function MembersPage() {
	return (
		<div>
			<h3 className="text-3xl">MembersPage</h3>
			<Button
				as={Link}
				href="/"
				color="primary"
				variant="bordered"
				startContent={<FaRegSmile size={20} />}>
				Click me
			</Button>
		</div>
	);
}
