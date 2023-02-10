const { pool: dbPool } = require('@/db/connection');

export default async function handler(req, res) {

    /*
        body: JSON.stringify({
            username: user.username,
        }),
    */

    const body = req.body;

    try {
        const faculty_id = (await dbPool.query('SELECT account_id FROM accounts WHERE username = ?;', [body.username]))[0][0];

        const entry_list = (await dbPool.query("SELECT entries.entry_id, entries.student_id, accounts.first_name, accounts.last_name, entries.event_name, entries.event_date, entries.time_accrued, entries.latest_comment FROM entries INNER JOIN accounts ON entries.student_id = accounts.account_id WHERE entries.faculty_id = ? AND entries.entry_status = 'unreviewed';", [faculty_id.account_id]))[0];

        entry_list.forEach(entry => {
            entry.event_date = entry.event_date.toDateString();
        });

        return res.status(200).json({
            entry_list
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({message: e});
    }
}
