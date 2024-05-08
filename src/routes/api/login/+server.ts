import { database } from "$lib/rds";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
	const body = JSON.parse(await request.text());
	const [rows] = await database.query("SELECT * FROM accounts WHERE email = ? AND password = ?", [body.email, body.password]);
	const user = rows[0];
	if (user) {
		return json({
			status: 200,
			body: {
				id: user.id,
				username: user.username
			}
		});
	} else {
		return json({
			status: 401,
			body: {
				error: "Invalid username or password"
			}
		});
	}
}