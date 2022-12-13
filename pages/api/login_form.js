const { pool: dbPool } = require('@/db/connection');
const cookie = require('cookie');

export default async function handler(req, res) {
    // Get data submitted in request's body.
    const body = req.body
  
    // Guard clause checks for username and password,
    // and returns early if they are not found
    if (!body.username || !body.password) {
        return res.status(400).json({ data: 'Username or password not submitted.' });
    }

    try {
        // Verify an account with the specified credentials exists.
        const {account_id, username, password} = (await dbPool.query("SELECT account_id, username, password FROM accounts WHERE username = ? AND password = ?;", [body.username, body.password]))[0][0];

        // Since we're logging in again, create a new token
        const array = new Uint32Array(1);
        crypto.getRandomValues(array);

        // Give it to the browser
        res.setHeader("Set-Cookie", cookie.serialize("unfHoursTrackingSessionToken", body.sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 60 * 30, // in seconds -- 60 * 30 for 30 minutes
            sameSite: "strict",
            path: "/"
        }));

        // Flush out any old tokens
        await dbPool.query("DELETE FROM sessions WHERE account_id = ?;", [account_id]);

        // Set the new session token
        await dbPool.query("INSERT INTO sessions (account_id, session_token) VALUES (?, ?);", [account_id, parseInt(body.sessionToken)]);

        // Update the session to expire in 30 minutes
        await dbPool.query("UPDATE sessions SET expiration_time = DATE_ADD(NOW(), INTERVAL 30 MINUTE) WHERE account_id = ?;", [account_id]);

        console.log("200 OK");
        return res.status(200).json({ message: "Login successful."});
    }
    catch (e) {
        console.log(e);
        console.log("401 Unauthorized. Invalid username and password combination.");
        return res.status(500).json({message: e});
    }
}