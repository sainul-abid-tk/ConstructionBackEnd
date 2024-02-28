const mongoose=require('mongoose')

const reviewReportSchema=new mongoose.Schema({
    userName:{
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
    reason:{
        type:String,
        required:true
    },
    reviewId:{
        type:String,
        required:true
    }
},{timestamps:true})

const reviewreports= mongoose.model("reviewreports",reviewReportSchema)

module.exports=reviewreports