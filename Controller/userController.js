
const users=require('../Models/userModel')
const jwt=require('jsonwebtoken')
const {encrypt,decrypt}=require('n-krypta')

exports.register=async(req,res)=>{
    const {username,email,password,profileImage}=req.body
    const profile=req.file?req.file.filename:profileImage
    const encryptPassword=encrypt(password,process.env.N_CRYPT_SECRET_KEY)
    try{
        const existingUser= await users.findOne({email})
        if(existingUser){
            res.status(406).json("User Already exist Please login!!")
        }else{
            const validateEmail = (email) => {
                return email.match(
                  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
              };
            if(validateEmail(email)){
                const newUser=users({
                    username,email,password:encryptPassword,profileImage:profile
                })
                await newUser.save()
                res.status(200).json(newUser)
            }else{
                res.status(406).json("This Email is not valid")
            }
            
        }
    }catch(err){
        res.status(401).json(err)
    }
}

exports.login= async(req,res)=>{
    let {email,password}=req.body
    password=encrypt(password,process.env.N_CRYPT_SECRET_KEY)
    console.log(password);
    try{
        const existingUser=await users.findOne({email,password})
        if(existingUser){
             // generate token using jwt-
             const token =jwt.sign({userId:existingUser._id},process.env.JWT_SECRET_KEY)
             res.status(200).json({existingUser,token})
        }else{
            res.status(406).json("Invalid Email/Password!!")
        }
    }catch(err){
        res.status(401).json(err)
    }
}

exports.googleLogin=async(req,res)=>{
    const {username,email,password,profileImage}=req.body
    try{
     const existingUser=await users.findOne({email})
     if(existingUser){
        const user=existingUser
        console.log(user);
        const token =jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY)
        res.status(200).json({user,token})
     }else{
        const user= users({
            username,email,password,profileImage
        })
        await user.save()
        console.log(user);
        const token =jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY)
        console.log(token);
        res.status(200).json({user,token})
     }
    }catch(err){
        res.status(401).json(err)
    }
}

// get Decrepting Env
exports.getDecryptingEnv=async(req,res)=>{
   try{
    res.status(200).json(
        process.env.N_CRYPT_SECRET_KEY
    )
   }catch(err){
    res.status(401).json(err)
   }
}
// update UserProfile

exports.updateUserProfile=async(req,res)=>{
    const userId=req.payload
    const {username,password,email,profileImage}=req.body
    const profile=req.file?req.file.filename:profileImage
    const encryptPassword=encrypt(password,process.env.N_CRYPT_SECRET_KEY)
    console.log(req.body);
    try{
        const validateEmail = (email) => {
            return email.match(
              /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
          };
          if(validateEmail(email)){
            const profilUpdate=await users.findByIdAndUpdate({_id:userId},{
                username,email,password:password==""?password:encryptPassword,profileImage:profile
            },{new:true})
            await profilUpdate.save()
            res.status(200).json(profilUpdate)
          }else{
            res.status(406).json("This Email is not valid")
          }
        
    }catch(err){
        res.status(401).json(err)
    }
}
