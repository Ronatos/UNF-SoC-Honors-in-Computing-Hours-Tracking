import mysql from "mysql2/promise";
const { pool: dbPool } = require('@/db/connection');



export default async function handler(req, res) {
    // Get data submitted in request's body.
    const body = req.body

    // Optional logging to see the responses
    // in the command line where next.js app is running.
    console.log('body: ', body)


    try {
        const id = req.id 
        const body = req.body
        console.log('body: ', body)

        const aquery = "UPDATE entries SET entry_status = '" + body.approval + "' WHERE entry_id = 1";
        console.log(aquery)
        
        const values = [];
        const [data] = await dbPool.query(query, values);
        dbconnection.end();
        
       // const values = [];
      //  const [data] = await dbPool.query(query, values);
       console.log (entity)
      res.status(200).json({ entries: data });
      } catch (error) {
        // unhide to check error
        // res.status(500).json({ error: error.message });
      }
    
    
    }
