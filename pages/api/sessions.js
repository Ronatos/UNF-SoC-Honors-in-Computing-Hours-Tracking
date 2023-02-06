import { withSessionRoute } from "pages/lib/config/withSession";

const { pool: dbPool } = require('@/db/connection');

export default withSessionRoute(createSessionRoute);

async function createSessionRoute(req, res) {
    if (req.method === "POST") {
        const body = req.body;

        const account_data = (await dbPool.query("SELECT username, password FROM accounts WHERE username = ? AND password = ?;", [body.username, body.password]))[0][0];

        if (account_data != undefined) {
            req.session.user = {
                username: body.username,
                isAdmin: true
            };
            await req.session.save();
            res.send({ ok: true });
        }
        return res.status(403).json({message: "Invalid username and password combination."});
    }
    return res.status(404).json({message: "Invalid username and password combination."});
}