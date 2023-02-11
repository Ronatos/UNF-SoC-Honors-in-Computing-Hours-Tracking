const { pool: dbPool } = require('@/db/connection');

export default async function handler(req, res) {

    try {
        const faculty_list = (await dbPool.query('SELECT account_id, first_name, last_name FROM accounts WHERE role = "faculty";', []))[0];
        return res.status(200).json({
            faculty_list
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({message: e});
    }
}
