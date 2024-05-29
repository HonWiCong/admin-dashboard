import { database } from "$lib/rds";
import { json } from "@sveltejs/kit";

export async function GET() {
	const [rows] = await database.query("SELECT * FROM private_carpark_slot");

	const result = {
		status: 200,
		rows
	};

	return json(result);
}