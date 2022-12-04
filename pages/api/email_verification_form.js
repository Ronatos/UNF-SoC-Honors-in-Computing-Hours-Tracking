const { pool: dbPool } = require('@/db/connection');

export default async function handler(req, res) {

    // body: JSON.stringify({
    //     email: n01234567@unf.edu,
    //     code: 012345
    // })
    const body = req.body

    // Verify the email is valid - not exactly necessary, but might save us a trip to the database
    if (body.email.match(/^n\d{8}@unf\.edu$/i) == null) {
        console.log("400 Bad Request");
        res.status(400).json({message: "Must use a valid email."});
    }

    // Get all data from database that will be needed at once to reduce # of queries
    try {
        // this could return undefined if the user entered the wrong code or an expired one
        const {account_id} = (await dbPool.query("SELECT account_id FROM email_verification_codes WHERE TIMESTAMPDIFF(MINUTE, creation_time, CURRENT_TIMESTAMP) < 10;", [body.code]))[0][0];
        console.log(account_id);

        // if account_id is undefined this will fail
        // could also fail if an account has been deleted without cascading and there are entries for it in the email_verification_codes table
        const {email_address, role} = (await dbPool.query("SELECT email_address, role FROM accounts WHERE account_id = ?;", [account_id]))[0][0];

        // Verify that the submitted email address matches the email we sent the code that they entered
        if (body.email != email_address) {
            console.log("400 Bad Request");
            res.status(400).json({ message: "Invalid verification code."});
        }
    }
    catch (e) {
        console.log(e);
        console.log("400 Bad Request");
        res.status(400).json({ message: "Invalid or expired verification code."});
    }

    console.log("200 OK");

    // Change the account from 'email unverified' to either 'active' or 'pending admin approval' depending on role.
    if (role == 'student') {
        await dbPool.query('UPDATE accounts SET account_status = "active" WHERE account_id = ?;', [account_id]);
    }
    else {
        await dbPool.query('UPDATE accounts SET account_status = "pending admin approval" WHERE account_id = ?;', [account_id]);
    }

    // Delete the verification codes for that user from the database. They're not needed anymore, and there could be many.
    await dbPool.query("DELETE FROM email_verification_codes WHERE account_id = ?;", [account_id]);
    res.status(200).json({ message: "Email validation successful."});
}
