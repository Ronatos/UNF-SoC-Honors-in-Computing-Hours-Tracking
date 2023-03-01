const { pool: dbPool } = require('@/db/connection');
import mysql from "mysql2/promise";

/*



*/


export default async function handler(req, res) {

  try {
    console.log("Fetching...")
    const query = "SELECT * FROM accounts WHERE account_status ='Status Pending'";
    const values = [];
    //const [data] = await dbPool.query(query, values);
    const [data] = await dbPool.query(query, values);
    

    res.status(200).json({ accounts: data });
  } catch (error) {
    // unhide to check error
    res.status(500).json({ error: error.message });
  }
}


