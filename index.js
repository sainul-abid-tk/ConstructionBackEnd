require('dotenv').config()
const express=require('express')
const {Server}=require('socket.io')
const cors=require('cors')
const router=require('./Routes/routes')
const Socket=require('./Socket.io/socketio')
const cPServer=express()
const chatServer=require('http').createServer(cPServer)
require('./DB/connection')
cPServer.use(cors())
cPServer.use(express.json())
cPServer.set('view engine','ejs')
cPServer.use(router)
cPServer.use('/uploads',express.static('./uploads'))
const PORT=3000 || process.env.PORT
const io=new Server(chatServer,{
    cors:{
        // origin:["https://connectie.vercel.app"],
        origin:["http://localhost:5173"],
        methods:['GET','POST']
    }
})
cPServer.get('/',(req,res)=>{
    res.status(200).send("<h1>Hello Construction Project!!</h1>")
})

io.on("connection",(Socket))

chatServer.listen(PORT,()=>{
    console.log(`Construction Project Started at ${PORT}`);
})

