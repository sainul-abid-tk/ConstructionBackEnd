require('dotenv').config()
const express=require('express')
const cors=require('cors')
const router=require('./Routes/routes')
const cPServer=express()
require('./DB/connection')
cPServer.use(cors())
cPServer.use(express.json())
cPServer.set('view engine','ejs')
cPServer.use(router)
cPServer.use('/uploads',express.static('./uploads'))
const PORT=5000 || process.env.PORT

cPServer.listen(PORT,()=>{
    console.log(`Construction Project Started at ${PORT}`);
})

cPServer.get('/',(req,res)=>{
    res.status(200).send("<h1>Hello Construction Project!!</h1>")
})