// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Product from "../../../Models/Product";
import connectDb from "../../../middleware/mongoose";

const handler = async (req, res) => {
    if (req.method == 'POST') {
        for (const item of req.body) {
            try {
                let p = await Product.create(item)
                console.log(p)
            } catch (error) {
                res.status(400).json({ error : `error while adding ${item.slug}` })
                return
            }
        }
        res.status(202).json({ success : true })
    } else {
        res.status(502).json({ error : "method not allowed" })
    }    
}

export default connectDb(handler)