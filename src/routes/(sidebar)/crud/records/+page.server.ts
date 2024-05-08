import { database } from '$lib/rds';

export const load = async () => {
	const [rows] = await database.query('SELECT * FROM car_entry_exit_log ORDER BY id DESC LIMIT 20 OFFSET 0');
	return { records: rows };
}