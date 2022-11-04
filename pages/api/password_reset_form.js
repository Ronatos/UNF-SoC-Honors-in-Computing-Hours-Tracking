let fs = require('fs')
let path = require('path')

export default function handler(req, res) {
    const body = req.body
    console.log('body: ', body)

    // body = {
    //     username: string,
    //     email: string,
    //     password: string,
    //     passwordConfirmation: string,
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

    // Verify the username exists
    let accountIndex = accounts.findIndex(account => account.username === body.username);
    if (accountIndex == -1) {
        console.log("400 Bad Request");
        res.status(400).json({message: "Specified username does not exist."})
    }

    // Verify the email matches
    // This will eventually need to be an email to the user
    else if (accounts[accountIndex].email != body.email) {
        console.log("400 Bad Request");
        res.status(400).json({message: "Email does not match specified username."})
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

        // We would need to write logic to edit a password in the mock database,
        // which honestly would take more time than writing the stored procedure
        // to update the password in the database, so I'm not going to waste my time.
        accounts[accountIndex].password = body.password;

        res.status(200).json({ message: "Password reset not functional at this time, but you did it right."})
    }
}
