const { pool: dbPool } = require('@/db/connection');

export default async function handler(req, res) {
  const body = req.body;

  try {
    const formData = await dbPool.query("INSERT INTO entries (event_name, time_accrued, event_date, faculty_id, latest_comment) VALUES (?, ?, ?, ?, ?);", [
      body.event,
      body.hours,
      body.event_date,
      body.professor,
      body.notes
    ]);
    console.log("Form data successfully stored in database.");
    return res.status(200).json({ message: "Form data stored in database successfully." });
  } catch (e) {
    console.log("Error storing form data in database.");
    console.log(e);
    return res.status(500).json({ message: e });
  }
}
