const { pool: dbPool } = require('@/db/connection');

export default async function handler(req, res) {

    /*
        body: JSON.stringify({
            entry_id: int,
            new_status: 'Approved' or 'Denied',
        }),
    */

    const body = req.body;

    try {
        const update_data = (await dbPool.query('UPDATE entries SET entry_status = ? WHERE entry_id = ?;', [(body.new_status == 'Approve' ? 'Approved' : 'Denied'), body.entry_id]))[0][0];

        return res.status(200).json({
            
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({message: e});
    }
}
