let fs = require('fs')
let path = require('path')

export default function handler(req, res) {
    // Get data submitted in request's body.
    const body = req.body
  
    // Optional logging to see the responses
    // in the command line where next.js app is running.
    console.log('body: ', body)
  
    // Guard clause checks for username and password,
    // and returns early if they are not found
    if (!body.username || !body.password) {
        // Sends a HTTP bad request error code
        return res.status(400).json({ data: 'Username or password not submitted.' })
    }

    // The following several lines will be replaced with database logic once one is implemented.
    // This just looks through the mock database and verifies an account with the specified credentials exists.
    const accountsDir = "db/accounts";
    let accounts = [];

    // Loop through all the files in accounts directory and add them to the accounts array
    fs.readdirSync(accountsDir).forEach(file => {
        let filepath = path.join(accountsDir, file);
        accounts.push(JSON.parse(fs.readFileSync(filepath, 'utf8')));
    });

    let accountIndex = accounts.findIndex(account => account.username === body.username);

    if (accountIndex != -1 && accounts[accountIndex].username == body.username && accounts[accountIndex].password == body.password) {
        // 200 OK
        console.log("200 OK");
        res.status(200).json({ message: "Login successful."})
    }
    else {
        // 401 Unauthorized
        console.log("401 Unauthorized");
        res.status(401).json({message: "Invalid username or password."})
    }
}
