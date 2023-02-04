const crypto = require('crypto');
const { pool: dbPool } = require('@/db/connection');

export default async function handler(req, res) {

    // body: JSON.stringify({
    //     username: string,
    //     email: n01234567@unf.edu,
    //     password: string,
    //     role: 'student', 'faculty', or 'admin'
    // })
    const body = req.body;

    // Verify the username isn't already taken
    try {
        const existingUsernames = await dbPool.query("SELECT username FROM accounts WHERE username = ?;", [body.username]);
        if (existingUsernames[0].length > 0) {
            console.log("400 Bad Request. Username already in use.");
            return res.status(400).json({message: "Username already in use."});
        }
    }
    catch (e) {
        console.log("500 Internal Server Error. 'SELECT username FROM accounts WHERE username = ?;' failed");
        console.log(e);
        return res.status(500).json({message: e});
    }

    // Verify the email exists
    if (body.email.match(/^n\d{8}@unf\.edu$/i) == null) {
        console.log("400 Bad Request. Email doesn't match the regex.");
        return res.status(400).json({message: "Must use a valid email."});
    }

    // Create the account
    console.log("200 OK");

    // Create the account in 'email unverified' status
    try {
        const account_creation_results = await dbPool.query("INSERT INTO accounts (username, password, email_address, role, account_status) VALUES (?, ?, ?, ?, ?);", [body.username, body.password, body.email, body.role, 'email unverified']);

        // Create a random 5 or 6 digit verification code
        const array = new Uint32Array(1);
        crypto.webcrypto.getRandomValues(array);

        // Add it to the email_verification_codes table
        await dbPool.query("INSERT INTO email_verification_codes (account_id, code) VALUES (?, ?);", [account_creation_results[0].insertId, String(array).substring(0, 6)]);
        console.log("The verification code is " + String(array).substring(0, 6) + ". Remove this console log once email verification is complete.");
    }
    catch (e) {
        console.log("500 Internal Server Error. Failed creation of the verification code.");
        console.log(e);
        return res.status(500).json({message: e});
    }

    // Send an email with a verification code and instructions, enabling the user to submit it on /email_verification to verify their email
    // We will likely want to use the UNF email tenant, which may lead us to the question
    // of why we're not using SSO.

    return res.status(200).json({ message: "Account creation successful."});
}
