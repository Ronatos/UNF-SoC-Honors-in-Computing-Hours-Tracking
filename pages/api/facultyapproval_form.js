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
    if (!body.approved || !body.denied) {
        // Sends a HTTP bad request error code
        return res.status(400).json({ message: 'Approval or Denial not submitted.' })
    }

    // The following several lines will be replaced with database logic once one is implemented.
    // This just looks through the mock database and verifies an account with the specified credentials exists.
    const submitsDir = "db/submits";

    let submits = [];

    // Loop through all the files in submits directory and add them to the submits array
    fs.readdirSync(submitsDir).forEach(file => {
        let filepath = path.join(submitsDir, file);
        submits.push(JSON.parse(fs.readFileSync(filepath, 'utf8')));
    });

    let submitsIndex = submits.findIndex(submits => submits.approved === body.approved);

    if (submitsIndex != -1 && submits[submitsIndex].approved == body.approved && submits[submitsIndex].denied == body.denied) {
        // 200 OK
        console.log("200 OK");
        res.status(200).json({ message: "submission successful."})
    }
    else {
        // 400 Bad Request
        console.log("400 Bad Request");
        res.status(401).json({message: "Invalid submission"})
    }
}