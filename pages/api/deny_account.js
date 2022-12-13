const { pool: dbPool } = require('@/db/connection');
import mysql from "mysql2/promise";

/*



*/

export default async function handler(req, res) {
  const body = req.body
  console.log('body: ', body)

  try {
    const query = "DELETE FROM Accounts WHERE account_id = '" + body + "'";  //WILL NEED TO UPDATE INCASE OF SQL INJECTION
    const values = [];
    //const [data] = await dbPool.query(query, values);
    const [data] = await dbPool.query(query, values);
    dbconnection.end();

    res.status(200).json({ accounts: data });
  } catch (error) {
    // unhide to check error
    // res.status(500).json({ error: error.message });
  }
}