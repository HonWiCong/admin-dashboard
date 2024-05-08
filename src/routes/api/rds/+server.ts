import { database } from "$lib/rds";
import { json } from "@sveltejs/kit";

export default async function GET() {
	console.log(database);
	return json({ message: "Hello, world!" });
}