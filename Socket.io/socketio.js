const messageController=require('../Controller/messageController')
const rooms = require('../Models/roomsModel');
const messages = require('../Models/messagesModel');
const notifications=require('../Models/notificationModel')
let adminSocket = {}; // Store admin socket
let userSockets = {}; // Store user sockets
const Socket=(socket)=>{
  socket.on('userMessage',async (NewMessage) => {
    const {from,to,message,time}=NewMessage
    
    // Forward user messages to admin
    const existingRoom=await rooms.findOne({roomId:from})
    if(existingRoom){
      socket.join(from)
      const roomId=existingRoom._id
       const latestMessage=new messages({
        roomId,from,to,message,time
       })
       await latestMessage.save()
       const roomUpdate=await rooms.findByIdAndUpdate({_id:roomId},{createdDate:latestMessage.createdAt},{new:true})
       await roomUpdate.save()
       const notification=new notifications({
        roomId,from,to,message,time
      })
      await notification.save()
     }else{
       const newRoom=new rooms({
        roomId:from,
        createdDate:""
       })
       await newRoom.save()
       socket.join(from)
       const roomId=newRoom._id
       const latestMessage=new messages({
        roomId,from,to,message,time
       })
       await latestMessage.save()
       const roomUpdate=await rooms.findByIdAndUpdate({_id:roomId},{createdDate:latestMessage.createdAt},{new:true})
       await roomUpdate.save()
       const notification=new notifications({
        roomId,from,to,message,time
      })
      await notification.save()
      }
     const allRooms=await rooms.find().sort({createdDate:-1})
     if(allRooms){
      socket.to(to).emit('adminRooms',allRooms)
     }
  });

  socket.on('adminRoomOpen',async()=>{
    const allRooms=await rooms.find().sort({createdDate:-1})
     if(allRooms){
      socket.emit('adminRooms',allRooms)
     }
  })
  socket.on('adminSideRoom',async(roomId)=>{
    await notifications.deleteMany({roomId})
    const allMessages=await messages.find({roomId})
    socket.emit('adminMessage',allMessages);
  })
  socket.on('userSideRoom',async(userId)=>{
    const allMessages=await messages.find({$or:[
      {to:userId},
      {from:userId}
    ]})
    socket.emit('adminMessage',allMessages);
  })
  socket.on('adminMessage',async (NewMessage) => {
    //  Forward admin messages to user
    const {roomId,from,to,message,time}=NewMessage
        socket.join(from)
       const latestMessage=new messages({
        roomId,from,to,message,time
       })
       await latestMessage.save()
       const notification=new notifications({
        roomId,from,to,message,time
      })
      await notification.save()
  });

  

  socket.on('adminConnected',async (admin) => {
    socket.join(admin)
    const notification=await notifications.find()
    socket.emit('notification',notification)
  });

  socket.on('userConnected',async(userId) => {
    socket.join(userId)
    const notification=await notifications.find()
    socket.emit('notification',notification)
  });

  socket.on('disconnect', () => {
    const userId = Object.keys(userSockets).find((key) => userSockets[key] === socket);
    if (userId) {
      delete userSockets[userId];
    } else if (adminSocket === socket) {
      adminSocket = null;
    }
  });
}

module.exports=Socket