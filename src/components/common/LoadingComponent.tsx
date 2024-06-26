import { Spinner } from "@nextui-org/react";
import React from "react";

type Props = {
	label?: string;
};
export default function LoadingComponent({ label }: Props) {
	return (
		<div className="fixed inset-0 flex justify-center items-center">
			<Spinner
				label={label || "Loading..."}
				color="secondary"
				labelColor="secondary"
			/>
		</div>
	);
}
