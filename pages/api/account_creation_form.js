const { pool: dbPool } = require('@/db/connection');

let fs = require('fs')
let path = require('path')

export default async function handler(req, res) {

    const body = req.body
    console.log('body: ', body)

    // body = {
    //     username: string,
    //     email: string,
    //     nnumber: string,
    //     password: string,
    //     passwordConfirmation: string,
    //     firstName: string,
    //     lastName: string,
    // }

    // The following several lines will be replaced with database logic once one is implemented.
    // This just looks through the mock database and verifies an account with the specified credentials exists.
    const accountsDir = "db/accounts";
    let accounts = [];

    // Loop through all the files in accounts directory and add them to the accounts array
    fs.readdirSync(accountsDir).forEach(file => {
        let filepath = path.join(accountsDir, file);
        accounts.push(JSON.parse(fs.readFileSync(filepath, 'utf8')));
    });

    // Verify the username isn't already taken
    let accountIndex = accounts.findIndex(account => account.username === body.username);
    if (accountIndex != -1) {
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

    // Create the account. This is currently pointing to the mock database, and will need to be updated
    // when we implement a real database.
    // It's also really rough around the edges. I'm just dumping the contents of body in there for now.
    else {
        console.log("200 OK");

        let filename = path.join(accountsDir, body.username + ".json");
        console.log(filename);
        let data = new Uint8Array(Buffer.from(JSON.stringify(body)));
        console.log(data);
        fs.writeFileSync(filename, data);

        await dbPool.query("INSERT INTO accounts (username, password, email_address, n_number, first_name, last_name, role) VALUES (?, ?, ?, ?, ?, ?, 'student');", [body.username, body.password, body.email, body.nnumber, body.firstName, body.lastName]);

        res.status(200).json({ message: "Account creation successful."})
    }
}
