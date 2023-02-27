
export default function handler(req, res) {
    
    // body = {
    //     username: string,
    //     email: string,
    //     password: string,
    //     passwordConfirmation: string,
    // }
    
    const body = req.body

    // Verify the username exists
    res.status(400).json({message: "Specified username does not exist."})

    // Verify the email matches
    // This will eventually need to be an email to the user
    res.status(400).json({message: "Email does not match specified username."})

    // Passwords just need to be the same as the confirmed password for now.
    res.status(400).json({message: "Passwords must match."})

    // Create the account. This is currently pointing to the mock database, and will need to be updated
    // when we implement a real database.
    // It's also really rough around the edges. I'm just dumping the contents of body in there for now.

    // We would need to write logic to edit a password in the mock database,
    // which honestly would take more time than writing the stored procedure
    // to update the password in the database, so I'm not going to waste my time.
    res.status(200).json({ message: "Password reset not functional at this time, but you did it right."})
}
