import mysql from "mysql2/promise";

const database = mysql.createPool({
    host: "database.ckozhfjjzal0.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "aRHnjDuknZhPZc4",
    database: "parking",
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

database.on('connection', (connection) => {
    connection.on('error', (err) => {
        console.error('Database connection error:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was lost, attempting to reconnect...');
            database.getConnection().then(connection => {
                console.log('Reconnected to the database.');
            }).catch(err => {
                console.error('Failed to reconnect to the database:', err);
            });
        }
    });
});

export { database };