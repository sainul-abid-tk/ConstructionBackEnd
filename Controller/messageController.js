const rooms = require('../Models/roomsModel');
const messages = require('../Models/messagesModel');
const notifications= require('../Models/notificationModel')
exports.deleteRoom=async(req,res)=>{
    const {id}=req.params
    try{
      await rooms.deleteOne({_id:id})
      await messages.deleteMany({roomId:id})
      await notifications.deleteMany({roomId:id})
      res.status(200).json("Room Deleted Successfully!!!")
    }catch(err){
        res.status(401).json(err)
    }
}

exports.clearChat=async(req,res)=>{
    const {roomId}=req.params
    try{
        await messages.deleteMany({roomId})
        await notifications.deleteMany({roomId})
        res.status(200).json("Chat Cleared Successfully!!!")
    }catch(err){
        res.status(401).json(err)
    }
}

exports.deleteMessage=async(req,res)=>{
    const {id}=req.params
    try{
        const deletedMessage=await messages.findByIdAndDelete({_id:id})
        await notifications.deleteOne({message:deletedMessage.message})
        res.status(200).json("Message Deleted Successfully!!!")
    }catch(err){
        res.status(401).json(err)
    }
}