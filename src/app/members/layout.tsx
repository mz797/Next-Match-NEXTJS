import React, { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
	return (
		<div className="h-screen">
			<h1 className="text-2xl">layout</h1>
			{children}
		</div>
	);
}
