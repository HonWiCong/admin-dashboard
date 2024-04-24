import { database } from "$lib/database";
import { json } from "@sveltejs/kit";

export async function GET() {
	const today = new Date();
	const current_date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
	console.log(current_date);

	// select the data which is today (including the year as well) from the database by checking the enter_at column
	const [rows] = await database.query("SELECT * FROM car_entry_exit_log WHERE DATE(enter_at) = ?", [current_date]);

	const result = {
		status: 200,
		body: rows
	};

	return json(result);
}