import User from '../../../Models/User';
const jwt = require('jsonwebtoken');
import jwtLogin from "../../../middleware/jwtLogin";

const handler = async (req, res) => {
    let payload = jwt.decode(req.headers.token, process.env.SECRET_JWT_KEY)
    let u = JSON.parse(JSON.stringify(await User.findOne({ email: payload.email })))
    if (u.isAdmin) {
        res.status(200).json({ status: "available", email: payload.email, name: payload.name })
    }
    else {
        res.status(500).json({ status: "no entry", error: "You are Not Admin" })
    }
}

export default jwtLogin(handler)