const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    name:String,
    date:Date,
    products:[{
        category:String,
        details:String,
        name:String,
        price:Number,
        codes:[String]
    }]
})

module.exports = mongoose.model('Order',orderSchema)