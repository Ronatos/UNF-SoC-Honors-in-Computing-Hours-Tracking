import { withSessionRoute } from "pages/lib/config/withSession";

const { pool: dbPool } = require('@/db/connection');

export default withSessionRoute(createSessionRoute);

async function createSessionRoute(req, res) {
    if (req.method === "POST") {
        const body = req.body;

        const account_status = (await dbPool.query("SELECT account_status FROM accounts WHERE username = ? AND password = ?;", [body.username, body.password]))[0][0];
        const role = (await dbPool.query("SELECT role FROM accounts WHERE username = ? AND password = ?;", [body.username, body.password]))[0][0];

        if (account_status == undefined) {
            return res.status(403).json({message: "Invalid username and password combination."});
        }

        if (account_status.account_status != 'active') {
            return res.status(403).json({message: "Email verification required for login."});
        }

        req.session.user = {
            username: body.username,
            role: role.role
        };
        await req.session.save();
        return res.send({ ok: true });
    
    }
    return res.status(404).send("");
}