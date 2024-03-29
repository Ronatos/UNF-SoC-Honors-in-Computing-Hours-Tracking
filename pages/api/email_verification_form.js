const { pool: dbPool } = require('@/db/connection');
const sgMail = require('@sendgrid/mail')
const crypto = require('crypto');

export default async function handler(req, res) {

    // body: JSON.stringify({
    //     email: n01234567@unf.edu,
    //     code: 012345
    // })
    const body = req.body

    // Verify the email is valid - not exactly necessary, but might save us a trip to the database
    if (body.email.match(/^n\d{8}@unf\.edu$/i) == null) {
        console.log("400 Bad Request");
        return res.status(400).json({message: "Must use a valid email."});
    }

    if (body.code == '' || body.code == undefined) {
        // The user needs us to resend the verification email
        try {
            // Verify they are a user
            let accounts = (await dbPool.query("SELECT account_id, username FROM accounts WHERE email_address = ? AND account_status = 'email unverified';", [body.email]))[0];
            console.log(accounts);
            accounts.forEach(async account => {
                // Create a random 5 or 6 digit verification code
                const array = new Uint32Array(1);
                crypto.webcrypto.getRandomValues(array);
                const code = String(array).substring(0, 6);
                await dbPool.query("DELETE FROM email_verification_codes WHERE account_id = ?;", [account.account_id]);
                await dbPool.query("INSERT INTO email_verification_codes (account_id, code) VALUES (?, ?);", [account.account_id, code]);
                // using Twilio SendGrid's v3 Node.js Library
                // https://github.com/sendgrid/sendgrid-nodejs
                sgMail.setApiKey(process.env.SENDGRID_API_KEY)

                const msg = {
                    to: body.email, // Change to your recipient
                    from: 'unfsochonorsincomputing@gmail.com', // Change to your verified sender
                    subject: 'Honors in Computing Hours Tracking - Email Verification',
                    text: 'Your code for ' + account.username + ' is ' + code + '. Please validate your email in the next 10 minutes.'
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
            })
            return res.status(200).json({ message: "Verification email resent."});
        }
        catch (e) {
            console.log(e); // there are technically 2 errors that could occur here - one should send a 500, the other a 400 (TypeError)
            console.log("400 Bad Request");
            return res.status(400).json({ message: "Invalid or expired verification code."});
        }
    }

    // Get all data from database that will be needed at once to reduce # of queries
    try {
        // this could return undefined if the user entered the wrong code or an expired one
        let {account_id} = (await dbPool.query("SELECT account_id FROM email_verification_codes WHERE code = ? AND TIMESTAMPDIFF(MINUTE, creation_time, CURRENT_TIMESTAMP) < 10;", [body.code]))[0][0];
        console.log("AccountID = " + account_id);

        // if account_id is undefined this will fail
        // could also fail if an account has been deleted without cascading and there are entries for it in the email_verification_codes table
        const {email_address, role} = (await dbPool.query("SELECT email_address, role FROM accounts WHERE account_id = ?;", [account_id]))[0][0];
        console.log("Email Address = " + email_address);
        console.log("Role = " + role);

        // Verify that the submitted email address matches the email we sent the code that they entered
        if (body.email != email_address) {
            throw("Invalid or expired verification code.");
        }

        // Change the account from 'email unverified' to either 'active' or 'pending admin approval' depending on role.
        if (role == 'student') {
            await dbPool.query('UPDATE accounts SET account_status = "active" WHERE account_id = ?;', [account_id]);
        }
        else {
            await dbPool.query('UPDATE accounts SET account_status = "pending admin approval" WHERE account_id = ?;', [account_id]);
        }

        // Delete the verification codes for that user from the database. They're not needed anymore, and there could be many.
        await dbPool.query("DELETE FROM email_verification_codes WHERE account_id = ?;", [account_id]);
    }
    catch (e) {
        console.log(e); // there are technically 2 errors that could occur here - one should send a 500, the other a 400 (TypeError)
        console.log("400 Bad Request");
        return res.status(400).json({ message: "Invalid or expired verification code."});
    }

    console.log("200 OK");
    return res.status(200).json({ message: "Email validation successful."});
}
