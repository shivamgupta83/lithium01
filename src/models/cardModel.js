const mongoose = require("mongoose")

const cardSchema = new mongoose.Schema({
    cardNumber:{type: String , unique:true},
    cardType :String ,
    customerName  : String,
    status : {
        type :String,
        enum:["ACTIVE","INACTIVE"],
        Default: 'ACTIVE'
            },
    vision :  String,
    customerID : {
        type:String,
        ref:"Customer",
    unique:true
    }
},{timestamps : true})

module.exports = mongoose.model("card", cardSchema)