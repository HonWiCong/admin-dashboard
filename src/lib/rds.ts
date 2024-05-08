import mysql from "mysql2/promise";

export const database = await mysql.createConnection({
	host: "database-2.ckozhfjjzal0.us-east-1.rds.amazonaws.com",
	user: "admin",
	password: "password",
	database: "parking",
	port: 3306,
});