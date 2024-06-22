"use client";
import { registerUser } from "@/app/actions/authActions";
import { registerSchema, RegisterSchema } from "@/lib/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import React from "react";
import { useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";

export default function RegisterForm() {
	const {
		handleSubmit,
		register,
		setError,
		formState: { errors, isValid, isSubmitting },
	} = useForm<RegisterSchema>({
		mode: "onTouched",
		// resolver: zodResolver(registerSchema),
	});

	const onSubmit = async (data: RegisterSchema) => {
		const result = await registerUser(data);
		if (result.status === "success") {
			console.log("success");
		} else {
			if (Array.isArray(result.error)) {
				result.error.forEach((e) => {
					const fieldName = e.path.join(".") as
						| "email"
						| "name"
						| "password";
					setError(fieldName, { message: e.message });
				});
			} else {
				setError("root.serverError", { message: result.error });
			}
		}
	};
	return (
		<Card className="w-2/5 mx-auto">
			<CardHeader className="flex flex-col items-center justify-center">
				<div className=" flex flex-col gap-2 items-center text-secondary ">
					<div className="flex flex-row items-center gap-3 ">
						<GiPadlock size={30} />
						<h1 className="text-3xl font-semibold">Login</h1>
					</div>
					<p className="text-neutral-500">Welcome to Next Match</p>
				</div>
			</CardHeader>
			<CardBody>
				<form action="" onSubmit={handleSubmit(onSubmit)}>
					<div className="space-y-4">
						<Input
							defaultValue=""
							label="Name*"
							variant="bordered"
							isInvalid={!!errors.name}
							errorMessage={errors.name?.message as string}
							{...register("name")}
						/>
						<Input
							defaultValue=""
							label="Email*"
							variant="bordered"
							isInvalid={!!errors.email}
							errorMessage={errors.email?.message as string}
							{...register("email")}
						/>
						<Input
							defaultValue=""
							label="Password*"
							variant="bordered"
							type="password"
							isInvalid={!!errors.password}
							errorMessage={errors.password?.message as string}
							{...register("password")}
						/>
						{errors.root?.serverError && (
							<p className="text-danger text-sm">
								{errors.root.serverError.message}
							</p>
						)}
						<Button
							isLoading={isSubmitting}
							fullWidth
							type="submit"
							color="secondary"
							isDisabled={!isValid}>
							Register
						</Button>
					</div>
				</form>
			</CardBody>
		</Card>
	);
}
