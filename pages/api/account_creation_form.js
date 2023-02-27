const crypto = require('crypto');
const { pool: dbPool } = require('@/db/connection');
const sgMail = require('@sendgrid/mail')

export default async function handler(req, res) {

    // body: JSON.stringify({
    //     username: string,
    //     email: n01234567@unf.edu,
    //     password: string,
    //     role: 'student', 'faculty', or 'admin',
    //     first_name: string,
    //     last_name: string,
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


        const account_creation_results = await dbPool.query("INSERT INTO accounts (username, password, email_address, role, first_name, last_name, account_status) VALUES (?, ?, ?, ?, ?, ?, ?);", [body.username, body.password, body.email, body.role, body.first_name, body.last_name, 'email unverified']);

        // Create a random 5 or 6 digit verification code
        const array = new Uint32Array(1);
        crypto.webcrypto.getRandomValues(array);
        const code = String(array).substring(0, 6);

        // Add it to the email_verification_codes table
        await dbPool.query("INSERT INTO email_verification_codes (account_id, code) VALUES (?, ?);", [account_creation_results[0].insertId, code]);
        console.log("The verification code is " + code + ". Remove this console log once email verification is complete.");

        // using Twilio SendGrid's v3 Node.js Library
        // https://github.com/sendgrid/sendgrid-nodejs
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)

        const msg = {
            to: body.email, // Change to your recipient
            from: 'unfsochonorsincomputing@gmail.com', // Change to your verified sender
            subject: 'Honors in Computing Hours Tracking - Email Verification',
            text: 'Your code is ' + code + '. Please validate your email in the next 10 minutes.'
            // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        }
        sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent')
            })
            .catch((error) => {
                console.error(error)
            })

        return res.status(200).json({ message: "Account creation successful."});
    }
    catch (e) {
        console.log("500 Internal Server Error. Failed creation of the verification code.");
        console.log(e);
        return res.status(500).json({message: e});
    }
}
