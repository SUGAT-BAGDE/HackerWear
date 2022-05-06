import connectDb from "../../middleware/mongoose";
import jwtLogin from "../../middleware/jwtLogin";
import User from "../../Models/User"
import Order from "../../Models/Order"
import Product from "../../Models/Product"
const jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let payload = jwt.verify(req.headers.token, process.env.SECRET_JWT_KEY)
        let { _id } = JSON.parse(JSON.stringify(await User.findOne({email : payload.email})))
        let orders = JSON.parse(JSON.stringify(await Order.find({userId : _id})))
        res.status(200).json({ success : true, orders })
    } else {
        res.status(502).json({ success : false, error: "method not allowed" })
    }
}

export default connectDb(jwtLogin(handler))