const { pool: dbPool } = require('@/db/connection');

export default async function handler(req, res) {

    // Verify the email is valid - not exactly necessary, but might save us a trip to the database
    if (body.email.match(/^n\d{8}@unf\.edu$/i) == null) {
        console.log("400 Bad Request");
        res.status(400).json({message: "Must use a valid email."});
    }

  
}  

