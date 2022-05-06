const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId : {type: String, required: true},
    products : [
        {
            productId : { type: String, required: true},
            quantity : { type: Number, required: true, default: 1}
        }
    ],
    amount : {type:Number, required:true},
    phone : {type:String, required:true},
    address : {type:String, required: true},
    pinCode : {type:Number, required:true},
    status : {type:String, default:"unshipped", required: true},
}, {timestamps:true})


export default  mongoose.models.Order || mongoose.model("Order", OrderSchema)