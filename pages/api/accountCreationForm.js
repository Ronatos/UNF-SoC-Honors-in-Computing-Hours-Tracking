export default function handler(req, res) {
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

    if (body.password) {
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
