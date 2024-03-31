const mongoos =require('mongoose')

const workersSchema=new mongoos.Schema({
    registerImage:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:Number,
        required:true,
        unique:true
    },
    whatsappNumber:{
        type:Number,
        required:true,
    },
    categories: {
        type: [String],
        required: true
      },
    experience:{
        type:Number,
        required:true
    },
    workingDays:{
        type:String,
        required:true
    },
    availableTime:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    paymentMode:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    place:{
        type:String,
        required:true
    },
    workImages:{
        type:Array,
        required:true
    },
    userId:{
        type:String,
        required:true,
    },
    avarageReview:{
        type:String
    },
    status:{
        type:String,
        required:true
    }
},{timestamps:true})

const workers=mongoos.model("workers",workersSchema)
module.exports=workers