import { database } from "$lib/rds";

export async function load() {
	const [rows] = await database.query("SELECT * FROM variables");

	return { 
		message: "Hello, world!",
		body: rows,
	};
}