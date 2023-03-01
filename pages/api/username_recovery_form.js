let fs = require('fs')
let path = require('path')

export default function handler(req, res) {
    const body = req.body
    console.log('body: ', body)

    // body = {
    //     email: string,
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

    // Loop through all accounts and get the list of usernames associated with the specified email
    let associatedUsernames = [];
    accounts.forEach(account => {
        if (account.email === body.email) {
            associatedUsernames.push(account.username);
        }
    });

    // The only thing that would generate a bad request for now is not matching any emails on file
    if (associatedUsernames.length == 0) {
        console.log("400 Bad Request");
        res.status(400).json({message: "No usernames are associated with that email address."})
    }
    else {
        console.log("200 OK");
        res.status(200).json({ message: "Your username(s): " + associatedUsernames})
    }
}
