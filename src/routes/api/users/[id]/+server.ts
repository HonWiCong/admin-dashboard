import { json } from "@sveltejs/kit";

export async function GET({ id }) {
    console.log(id);
	const result = {
		status: 200,
		body: id
	};

	return json(result);
}