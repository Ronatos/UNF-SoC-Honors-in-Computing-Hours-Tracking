const { pool: dbPool } = require('@/db/connection');

export default async function handler(req, res) {

    const body = req.body

    // Verify the username isn't already taken
    const existingUsernames = await dbPool.query("SELECT username FROM accounts WHERE username = ?;", [body.username]);
    if (existingUsernames[0].length > 0) {
        console.log("400 Bad Request");
        res.status(400).json({message: "Username already in use."})
    }

    // Verify the email exists
    // This simple regex check isn't going to work in production. The only real way to
    // verify the existence of an email address is to send them an email, but this is simple enough
    // to catch some small stuff for now.
    else if (body.email.toLowerCase().match(/^\S+@\S+\.\S+$/) == null) {
        console.log("400 Bad Request");
        res.status(400).json({message: "Must use a valid email."})
    }

    // The n-number is important enough that additional verification is likely a good idea
    // in the form of an actual email sent to the individual at their n-number email address.
    // A simple regex check will probably suffice here for now, but even that is kind of overkill.
    else if (body.nnumber.toLowerCase().match(/n\d\d\d\d\d\d\d\d/) == null) {
        console.log("400 Bad Request");
        res.status(400).json({message: "Must enter a valid n-number."})
    }

    // Passwords just need to be the same as the confirmed password for now.
    else if (body.password != body.passwordConfirmation) {
        console.log("400 Bad Request");
        res.status(400).json({message: "Passwords must match."})
    }

    // Create the account
    else {
        console.log("200 OK");
        await dbPool.query("INSERT INTO accounts (username, password, email_address, n_number, first_name, last_name, role) VALUES (?, ?, ?, ?, ?, ?, 'student');", [body.username, body.password, body.email, body.nnumber, body.firstName, body.lastName]);
        res.status(200).json({ message: "Account creation successful."})
    }
}
