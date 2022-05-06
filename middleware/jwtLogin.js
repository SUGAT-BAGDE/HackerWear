import User from '../Models/User';
const jwt = require('jsonwebtoken');

const jwtLogin = (handler) =>  async (req, res) => {
    try {
        let payload = jwt.verify(req.headers.token, process.env.SECRET_JWT_KEY)
        let u = JSON.parse(JSON.stringify(await User.findOne({email : payload.email})))
        if (!u){
            res.status(500).json({ success : false, error: "account not exists", solution : "log in to your account" })
            return
        }
        return handler(req, res)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success : false, error: error.message, solution : "log in to your account" })
    }
}

export default jwtLogin