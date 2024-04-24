import mysql from "mysql2/promise";

export const database = await mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "smart_parking",
});