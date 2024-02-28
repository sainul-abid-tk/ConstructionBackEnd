const mongoose=require('mongoose')

const reviewSchema=new mongoose.Schema({
    workerId:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    ratingPoints:{
        type:Number,
        required:true
    },
    feedback:{
        type:String
    },
    userName:{
        type:String,
        required:true
    },
    userPhoto:{
        type:String
    }
},{timestamps:true})

const reviews= mongoose.model("reviews",reviewSchema)

module.exports=reviews