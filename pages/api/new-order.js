import connectDb from "../../middleware/mongoose";
import jwtLogin from "../../middleware/jwtLogin";
import User from "../../Models/User"
import Product from "../../Models/Product"
import Order from "../../Models/Order"
const jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let payload = jwt.verify(req.headers.token, process.env.SECRET_JWT_KEY)
        let { _id } = JSON.parse(JSON.stringify(await User.findOne({email : payload.email})))
        let products = []
        let amount = 0

        for (let index = 0; index < req.body.products.length; index++) {
            const product = req.body.products[index];
            try {
                let p = await Product.findOne({slug : product.productId})
                let {availableQty, _id, price, slug} = p
                if (availableQty >= product.quantity) {
                    products.push({productId:slug, quantity : product.quantity})
                    await Product.findByIdAndUpdate(_id, {availableQty : availableQty - product.quantity})
                    amount = amount + (price*product.quantity)
                }
            } catch (error) {
                
            }
        }
        let order = new Order({userId: _id, products, pinCode: req.body.pincode, address: req.body.address, phone: req.body.phone, amount});
        order.save()
        res.status(200).json({ success : true, message: "Your order is Confirmed!", orderId:order._id})
    } else {
        res.status(502).json({ success : false, error: "method not allowed" })
    }
}

export default connectDb(jwtLogin(handler))