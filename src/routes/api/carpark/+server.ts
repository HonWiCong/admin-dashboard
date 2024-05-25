import { database } from "$lib/rds";
import { json } from "@sveltejs/kit";

export async function GET() {
	const value1 = await database.query("SELECT * FROM variables WHERE name = 'public_max_car_number' LIMIT 1");
	const value2 = await database.query("SELECT * FROM variables WHERE name = 'public_current_car_number' LIMIT 1");
	const rows = [value1[0][0], value2[0][0]];
	const settings = {
		status: 200,
		body: rows
	};

	return json(settings);
}