import { database } from "$lib/rds";
import { json } from "@sveltejs/kit";

export async function GET() {
	const [rows] = await database.query("SELECT * FROM variables");

	const settings = {
		status: 200,
		body: rows
	};

	return json(settings);
}

export async function POST({ request }) {
	const body = JSON.parse(await request.text());
	console.log("body", body);
	for (const setting of body) {
		await database.query("UPDATE variables SET value = ? WHERE name = ?", [setting.value, setting.name]);
	}
	const [result] = await database.query("SELECT * FROM variables WHERE hidden = 0");
	const settings = {
		status: 200,
		body: result
	};

	return json(settings);
}