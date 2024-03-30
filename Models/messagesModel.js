const mongoose=require('mongoose')

const messageSchema=new mongoose.Schema({
    roomId:{
        type:String,
        required:true,
    },
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    }
},{timestamps:true})

const messages=mongoose.model("messages",messageSchema)

module.exports=messages