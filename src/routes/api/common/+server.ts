import { database } from "$lib/database";
import { json } from "@sveltejs/kit";

export async function GET() {
	const [rows] = await database.query(`
	SELECT 
		carplate,
		COUNT(*) AS appear_count,
		SUM(duration) AS total_duration
	FROM 
		car_entry_exit_log
	GROUP BY 
		carplate
	ORDER BY 
		appear_count DESC, total_duration DESC
	LIMIT 10;
	`);

	console.log(rows);

	return json({
		status: 200,
		body: rows
	});
}