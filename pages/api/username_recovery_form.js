const { pool: dbPool } = require('@/db/connection');
const sgMail = require('@sendgrid/mail')

export default async function handler(req, res) {

    // body = {
    //     email: string,
    // }
    
    const body = req.body

    try {
        const accounts = (await dbPool.query("SELECT username FROM accounts WHERE email_address = ?;", [body.email]))[0];
        console.log(accounts);
        let usernames = [];
        accounts.forEach(account => {
            usernames.push(account.username);
        })
        
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
            to: body.email, // Change to your recipient
            from: 'unfsochonorsincomputing@gmail.com', // Change to your verified sender
            subject: 'Honors in Computing Hours Tracking - Username Recovery',
            text: 'Your username(s): ' + usernames,
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
        return res.status(200).json({ message: "Email sent."});
    }
    catch (e) {
        console.log(e); // there are technically 2 errors that could occur here - one should send a 500, the other a 400 (TypeError)
        console.log("400 Bad Request");
        return res.status(400).json({ message: "Unknown email address."});
    }
}
