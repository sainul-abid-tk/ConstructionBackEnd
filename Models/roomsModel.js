const mongoose=require('mongoose')

const roomSchema=new mongoose.Schema({
    roomId:{
        type:String,
        required:true,
        unique:true
    },
    createdDate:{
        type:String
    }
})

const rooms=mongoose.model("rooms",roomSchema)
module.exports=rooms