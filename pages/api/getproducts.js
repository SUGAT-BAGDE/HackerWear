// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Product from "../../Models/Product";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
    const products = await Product.find()

    let varients = {}

    for (let product of products) {
        if (product.title in varients && product.availableQty!=0){
            // varients[product.title].color = [product]
            if (!varients[product.title].color.includes(product.color)){
                varients[product.title].color.push(product.color)
            }
            if (!varients[product.title].size.includes(product.size)){
                varients[product.title].size.push(product.size)
            }
        }
        else if (product.availableQty!=0){
            varients[product.title] = JSON.parse(JSON.stringify(product))
            varients[product.title].size = [product.size]
            varients[product.title].color = [product.color]
        }
    }

    res.status(200).json({ products:varients})
}

export default connectDb(handler)
