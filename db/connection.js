// get the client
const fs = require('fs');
const mysql = require('mysql2/promise');

const sslCert = process.env.DB_SSLPATH ? { ca: fs.readFileSync(process.env.DB_SSLPATH) } : undefined;

// Create the connection pool. The pool-specific settings are the defaults
export const pool = mysql.createPool({
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DEFAULTDB,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: sslCert
});
