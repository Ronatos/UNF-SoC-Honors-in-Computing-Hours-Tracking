const { pool: dbPool } = require('@/db/connection');

export default async function handler(req, res) {

    /*
        body: JSON.stringify({
            entry_id: int,
            new_status: 'Approve' or 'Deny',
        }),
    */

        const body = req.body;

        try {
            
          const entryStatus = body.entry_status;
          const entryId = body.entry_id;
        
          if (entryStatus == 'Approve') {
            const updateData = await dbPool.query('UPDATE entries SET entry_status = ? WHERE entry_id = ?;', [body.entry_status == "Approved", entryId]);
            return res.status(200).json({});
          } else {
            const updateData = await dbPool.query('UPDATE entries SET entry_status = ? WHERE entry_id = ?;', [body.entry_status == "Denied", entryId]);
            return res.status(200).json({});
          }
        } catch (e) {
          console.log(e);
          return res.status(500).json({message: e});
        }
}







//     const body = req.body;

//     try {
//         console.log("body.news_status: " + body.new_status);
//         const update_data = (await dbPool.query('UPDATE entries SET entry_status = ? WHERE entry_id = ?;', [(body.new_status == 'Approve' ? 'Approved' : 'Denied'), body.entry_id]))[0][0];

//         return res.status(200).json({
            
//         });
//     }
//     catch (e) {
//         console.log(e);
//         return res.status(500).json({message: e});
//     }
// }
