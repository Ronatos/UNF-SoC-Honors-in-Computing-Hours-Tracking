const { pool: dbPool } = require('@/db/connection');

export default async function handler(req, res) {

    /*
        body: JSON.stringify({
                username: user.username,
                event: event.target.event.value,
                date: event.target.date.value,
                hours: event.target.hours.value,
                faculty_id: event.target.faculty_id.value
                comment: event.target.notes.value
            }),
    */
    const body = req.body;

    try {
        const student = (await dbPool.query("SELECT account_id FROM accounts WHERE username = ?;", [body.username]))[0][0];

        if (body.comment == "") {
            const entry_results = await dbPool.query("INSERT INTO entries (student_id, faculty_id, event_name, event_date, time_accrued, entry_status) VALUES (?, ?, ?, ?, ?, 'unreviewed');", [student.account_id, body.faculty_id, body.event, body.date, body.hours]);
            console.log(entry_results);
        }
        else {
            const entry_results = await dbPool.query("INSERT INTO entries (student_id, faculty_id, event_name, event_date, time_accrued, latest_comment, latest_commentor_id, entry_status) VALUES (?, ?, ?, ?, ?, ?, ?, 'unreviewed');", [student.account_id, body.faculty_id, body.event, body.date, body.hours, body.comment, student.account_id]);
            console.log(entry_results);
        }
        return res.status(200).json({message: "Form data stored in database successfully."});
    }
    catch (e) {
        return res.status(500).json(e);
    }
}
