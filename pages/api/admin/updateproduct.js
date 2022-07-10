// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Product from "../../../Models/Product";
import connectDb from "../../../middleware/mongoose";

const handler = async (req, res) => {
    if (req.method == 'POST') {
        console.log(req.body)
        try {
            let p = await Product.findOne({slug : req.body.slug})
            if (p) {
                p.desc = req.body.desc;
                p.color = req.body.color;
                p.size = req.body.size;
                p.availableQty += req.body.price;
                p.price = req.body.price;
                await p.save();
                res.status(202).json({ success: true, message: `${p.title} updated successfully`})
            }
        } catch (error) {
            res.status(500).json({ success: false, message: `error updating adding` })
            return
        }
        res.status(500).json({ success: false, message: `Product Not found` })
    } else {
        res.status(502).json({ success: false, error: "method not allowed" })
    }
}

export default connectDb(handler)