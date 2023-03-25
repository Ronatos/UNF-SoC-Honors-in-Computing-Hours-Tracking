const crypto = require('crypto');
const { pool: dbPool } = require('@/db/connection');
const sgMail = require('@sendgrid/mail')

export default async function handler(req, res) {
    
    // body = {
    //     username: string,
    //     email: string
    // }
    
    const body = req.body

    // if there is no code provided, this behavior
    if (body.code == '' || body.code == undefined) {
        console.log("No code provided.");
        try {
            // Verify the email matches the username in the database
            let account = (await dbPool.query("SELECT account_id FROM accounts WHERE email_address = ? AND username = ?;", [body.email, body.username]))[0][0];
            console.log(account);

            // Generate a random code tracking the password reset request, just like in email_verification
            const array = new Uint32Array(1);
            crypto.webcrypto.getRandomValues(array);
            const code = String(array).substring(0, 6);

            // Store the password reset code in the database, just like email verification
            await dbPool.query("DELETE FROM password_reset_codes WHERE account_id = ?;", [account.account_id]);
            await dbPool.query("INSERT INTO password_reset_codes (account_id, code) VALUES (?, ?);", [account.account_id, code]);

            // Send an email of the password reset
            // using Twilio SendGrid's v3 Node.js Library
            // https://github.com/sendgrid/sendgrid-nodejs
            sgMail.setApiKey(process.env.SENDGRID_API_KEY)

            const msg = {
                to: body.email, // Change to your recipient
                from: 'unfsochonorsincomputing@gmail.com', // Change to your verified sender
                subject: 'Honors in Computing Hours Tracking - Password Reset',
                text: 'Your code for ' + body.username + ' is ' + code + '. Please reset your password in the next 10 minutes.'
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
            return res.status(200).json({ message: "Email with code sent."});
        }
        catch (e) {
            console.log("400 Bad Request");
            return res.status(400).json({ message: "Username and email do not match."});
        }
    }

    // if there is a code provided, this behavior
    try {
        if (body.new_password != body.confirm_new_password) {
            throw("Passwords do not match. Please try again.");
        }

        // this could return undefined if the user entered the wrong code or an expired one
        let account = (await dbPool.query("SELECT account_id FROM password_reset_codes WHERE code = ? AND TIMESTAMPDIFF(MINUTE, creation_time, CURRENT_TIMESTAMP) < 10;", [body.code]))[0][0];
        console.log("AccountID = " + account.account_id);

        if (account.account_id == undefined) {
            throw("Invalid or expired verification code.");
        }

        await dbPool.query('UPDATE accounts SET password = ? WHERE account_id = ?;', [body.new_password, account.account_id]);

        // Delete the verification codes for that user from the database. They're not needed anymore, and there could be many.
        await dbPool.query("DELETE FROM password_reset_codes WHERE account_id = ?;", [account.account_id]);
    }
    catch (e) {
        console.log(e); // there are technically 2 errors that could occur here - one should send a 500, the other a 400 (TypeError)
        console.log("400 Bad Request");
        return res.status(400).json({ message: "Invalid or expired verification code."});
    }

    console.log("200 OK");
    return res.status(200).json({ message: "Password Reset successful."});
}
