import mysql from "mysql2/promise";

export const database = await mysql.createConnection({
	host: "database.ckozhfjjzal0.us-east-1.rds.amazonaws.com",
	user: "admin",
	password: "aRHnjDuknZhPZc4",
	database: "parking",
	port: 3306,
});