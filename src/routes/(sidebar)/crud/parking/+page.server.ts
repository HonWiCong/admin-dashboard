import { database } from '$lib/rds';

export const load = async () => {
	const [rows] = await database.query('SELECT * FROM parking_sessions ORDER BY id DESC LIMIT 20 OFFSET 0');
	return { parkings: rows };
}