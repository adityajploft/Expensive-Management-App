const mongoose = require("mongoose")

const transtionSchema = new mongoose.Schema({
    userid:{
        type:String,
        //  required:[true," userid is required "],

    },
    amount:{
        type:Number,
        //  required:[true," amount is required "],

    },
    type:{
        type:String,
        //  required:[true," type is required "],

    },
    category:{
        type:String,
        // required:[true,"category is required "],

    },
    refernce:{
      type:String,

    },
    desciption:{
        type:String,
        // required:[true,"desc is required "],
    },
    date:{
        type:Date,
       
        // required:[true ,"Date is requried"]
    }

},{ timestamps:true })

const transtionModel= mongoose.model("transection", transtionSchema)

module.exports = transtionModel;