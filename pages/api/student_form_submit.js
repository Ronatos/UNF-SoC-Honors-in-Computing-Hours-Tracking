const crypto = require('crypto');
const { pool: dbPool } = require('@/db/connection'); // Database connection

export default async function handler(req, res) {
  const body = req.body;

  const eventName = body.event || "";
  const hours = body.hours || 0;
  const eventDate = body.event_date ? body.event_date : new Date().toISOString().substr(0, 10);
  const facultyId = body.professor || "";
  const latestComment = body.notes || "";

  try {
    const formData = await dbPool.query("INSERT INTO entries (event_name, time_accrued, event_date, faculty_id, latest_comment) VALUES (?, ?, ?, ?, ?);", [eventName, hours, eventDate, facultyId, latestComment]);
    console.log("Form data successfully stored in database.");
  } catch (e) {
    console.log("Error storing form data in database.");
    console.log(e);
    return res.status(500).json({message: e});
  }

  return res.status(200).json({message: "Form data stored in database successfully."});
}
