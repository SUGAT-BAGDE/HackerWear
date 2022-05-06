import connectDb from "../../middleware/mongoose";
import User from "../../Models/User"
import cryptoJs from "crypto-js";
const jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let user = await User.findOne({ email: req.body.email })
        if (!user) {
            res.status(500).json({ error: "Invalid Crediantials" });
            return
        }
        var bytes  = cryptoJs.AES.decrypt(user.password, process.env.SECRET_AES_KEY);
        var decryptedPassword = bytes.toString(cryptoJs.enc.Utf8);
        if (decryptedPassword == req.body.password) {
            let token = jwt.sign({ success: true, name : user.name, email : user.email  }, process.env.SECRET_JWT_KEY, { expiresIn: '2d' });
            res.status(200).json({success : true, message: "Yeh! Logged in Succesfull!", token })
        }
        else {
            res.status(202).json({success : false, error: "Invalid Crediantials" })
        }
    } else {
        res.status(502).json({ success : false, error: "method not allowed" })
    }
}

export default connectDb(handler)