const { pool: dbPool } = require('@/db/connection');
import mysql from "mysql2/promise";

/*



*/


export default async function handler(req, res) {
 
  try {
    const query = "SELECT * FROM accounts WHERE account_status ='Pending'";
    const values = [];
    const [data] = await dbPool.query(query, values);
    dbconnection.end();

    res.status(200).json({ accounts: data });
  } catch (error) {
    // unhide to check error
    // res.status(500).json({ error: error.message });
  }
}


