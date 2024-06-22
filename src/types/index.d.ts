import { ZodIssue } from "zod";

type ActionResult<T> =
	| { status: "success"; data: T }
	| { status: "error"; error: strng | ZodIssue[] };
