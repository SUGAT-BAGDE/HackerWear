import Product from "../../../Models/Product";
import connectDb from "../../../middleware/mongoose";

const handler = async (req, res) => {

    // console.log(req.query)

    let size = req.query.size || null
    
    let product = JSON.parse(JSON.stringify(await Product.findOne({ slug: req.query.slug })))
    if (!product) {
        res.status(200).json({ err: "no product with this slug" })
        return
    }

    let avilableVarients = [];

    if (size) {
        avilableVarients = JSON.parse(JSON.stringify(await Product.find({ title: product.title, size: (size || product.size).toUpperCase(), })))
        if (!avilableVarients) {
            res.status(200).json({ err: "no product with this size" })
            return
        }
    }
    else {
        product = product
        avilableVarients = JSON.parse(JSON.stringify(await Product.find({ title: product.title, })))
    }

    let varients = {}

    for (const varient of avilableVarients) {
        if (Object.keys(varients).includes(varient.size.toUpperCase()) && varient.availableQty > 0) {
            varients[varient.size.toUpperCase()][varient.color.toLowerCase()] = varient
        }
        else {
            if (varient.availableQty > 0) {
                varients[varient.size.toUpperCase()] = {}
                varients[varient.size.toUpperCase()][varient.color.toLowerCase()] = varient
            }
        }
    }

    res.status(200).json({ product, varients, })
    //   res.status(202).json({})
}

export default connectDb(handler)