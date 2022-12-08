const { pool: dbPool } = require('@/db/connection');
import mysql from "mysql2/promise";

export default async function handler(req, res) {

  try {
    const query = "SELECT * FROM accounts ORDER BY account_id DESC";
    const values = [];
    const [data] = await dbPool.query(query, values);
    dbconnection.end();

    res.status(200).json({ accounts: data });
  } catch (error) {
    // unhide to check error
    // res.status(500).json({ error: error.message });
  }
}





















/*const { pool: dbPool } = require('@/db/connection');


export default async function handler(req, res) {
    const body = req.body;
    console.log('body: ', body)
    
    try {
        const accountPull = await dbPool.query("SELECT * FROM accounts ORDER BY account_id DESC");

      const values = []

      const [results] = await dbPool.query(accountPull, values)
    
      res.status(200).json({ results: data});
    }
    catch (e) {
        console.log("500 Internal Server Error");
        res.status(500).json({message: e});
    }


}
*/