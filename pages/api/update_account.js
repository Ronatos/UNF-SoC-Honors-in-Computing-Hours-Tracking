const { pool: dbPool } = require('@/db/connection');

export default async function handler(req, res) {

    /*
        body: JSON.stringify({
            account_id: int,
            action: 'Approve' or 'Deny',
        }),
    */
   /*
       APPROVE UPDATES ACCOUNT
       DENY DELETES ITS EXISTENCE COMPLETELY
    */

    const body = req.body;
    console.log(body);
    try {
        if (body.action === 'Approve') {
            const update_data = (await dbPool.query('UPDATE accounts SET account_status = ? WHERE account_id = ?;', ['active', body.account_id]))[0][0];

            return res.status(200).json({});
        }

        if (body.action === 'Deny') {
            const update_data2 = (await dbPool.query('DELETE FROM accounts WHERE account_id = ?;', [body.account_id]))[0][0];
               return res.status(200).json({});
           }
        const update_data1 = (await dbPool.query('DELETE FROM email_verification_codes WHERE account_id = ?;', [body.account_id]))[0][0];
        // const update_data2 = (await dbPool.query('DELETE FROM accounts WHERE account_id = ?;', [body.account_id]))[0][0];
        return res.status(200).json({});
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({message: e});
    }
}
