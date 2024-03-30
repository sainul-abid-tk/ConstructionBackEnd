const mongoose=require('mongoose')

const notificationSchema=new mongoose.Schema({
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
})

const notifications=mongoose.model('notifications',notificationSchema)

module.exports=notifications