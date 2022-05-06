// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "../../middleware/mongoose";
import User from "../../Models/User"
import cryptoJs from "crypto-js";

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let u = await User.findOne({email : req.body.email})
        if (u) {
            res.status(500).json({ error : "User already exist with this email" });
            return
        }
        let {name, email} = req.body 
        let password = cryptoJs.AES.encrypt(req.body.password , process.env.SECRET_AES_KEY).toString(); 
        let user = await new User({name, email, password})
        await user.save()
        res.status(200).json({success : true , message : "Success"})
        
    } else {
        res.status(502).json({ error : "method not allowed" })
    }    
}

export default connectDb(handler)