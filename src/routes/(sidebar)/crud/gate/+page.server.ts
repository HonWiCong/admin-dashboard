import { database } from '$lib/rds';

export const load = async () => {
    const [publicRows] = await database.query('SELECT * FROM car_entry_exit_log ORDER BY id ASC LIMIT 20 OFFSET 0');
    const [privateRows] = await database.query('SELECT * FROM access_logs ORDER BY id ASC LIMIT 20 OFFSET 0');
    return { publicRecords: publicRows, privateRecords: privateRows };
}
