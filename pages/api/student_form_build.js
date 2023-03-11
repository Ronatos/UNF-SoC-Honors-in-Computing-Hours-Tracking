const { pool: dbPool } = require('@/db/connection');

export default async function handler(req, res) {

    const { body } = req;
    console.log(body);
    try {
        const faculty_list = (await dbPool.query("SELECT account_id, first_name, last_name FROM accounts WHERE role = 'faculty' AND account_status = 'active';", []))[0];

        const student_id = (await dbPool.query('SELECT account_id FROM accounts WHERE username = ?;', [body.user]))[0][0];

        const entry_list = (await dbPool.query("SELECT entries.entry_id, entries.faculty_id, accounts.first_name, accounts.last_name, entries.event_name, entries.event_date, entries.time_accrued, entries.latest_comment, entries.entry_status FROM entries INNER JOIN accounts ON entries.faculty_id = accounts.account_id WHERE entries.student_id = ?;", [student_id.account_id]))[0];

        entry_list.forEach(entry => {
            // entry.entry_status = entry.entry_status.toString().charAt(0).toUppercase() + + entry.entry_status.toString().slice(1);
            entry.event_date = entry.event_date.toDateString();
        });
        
        return res.status(200).json({
            faculty_list, entry_list
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({message: e});
    }
}
