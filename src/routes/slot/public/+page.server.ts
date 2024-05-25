import { database } from "$lib/rds";
import type { PageLoad } from './$types';

export async function load() : PageLoad {
	const [rows] = await database.query("SELECT * FROM public_carpark_slot");
	return {
		rows
	};
}