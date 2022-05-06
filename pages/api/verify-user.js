import User from '../../Models/User';
const jwt = require('jsonwebtoken');

const verify_user = async (req, res) => {
    try {
        let payload = jwt.verify(req.headers.token, process.env.SECRET_JWT_KEY)
        let u = JSON.parse(JSON.stringify(await User.findOne({email : payload.email})))
        if (!u){
            res.status(500).json({ status : "unavailable", error: "account not exists", solution : "log in to your account" })
        }
        else{
            res.status(200).json({ status : "available", email:payload.email, name : payload.name})
        }
    } catch (error) {
        if (error.message== "jwt expired"){
            res.status(500).json({ status : "expired", solution : "log in to your account" })
        }
        else{
            res.status(500).json({ status : "unavailable", solution : "log in to your account" })
        }
    }
}

export default verify_user