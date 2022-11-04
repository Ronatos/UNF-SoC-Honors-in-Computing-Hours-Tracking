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

    const credentialDB = {
        username: "alex",
        password: "test"
    };

    if (credentialDB.username == body.username && credentialDB.password == body.password) {
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
  