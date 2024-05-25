import { database } from '$lib/rds';
import { json } from '@sveltejs/kit';
import { device } from '$lib/mqtt';

export async function GET() {
	const [rows] = await database.query('SELECT * FROM variables');

	const settings = {
		status: 200,
		body: rows
	};

	return json(settings);
}

export async function POST({ request }) {
	const body = JSON.parse(await request.text());
	for (const setting of body) {
		await database.query('UPDATE variables SET value = ? WHERE name = ?', [
			setting.value,
			setting.name
		]);
	}

	const [result] = await database.query('SELECT * FROM variables');
	const result2 = result.reduce((acc, { name, value }) => {
		acc[name] = value;
		return acc;
	}, {});

	device.publish('rpi/get_response', JSON.stringify(result2));

	const settings = {
		status: 200,
		body: result
	};

	return json(settings);
}
