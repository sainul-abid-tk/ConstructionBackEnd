const workers = require("../Models/registerModel");
const reviews=require('../Models/ReviewModel')
const users=require('../Models/userModel')
const reviewReports=require('../Models/reviewReportModel')
const {encrypt,decrypt}=require('n-krypta')

// get all users
exports.getAllUsers=async(req,res)=>{
    try{
        const allUsers = await users.find().sort({createdAt:-1})
        res.status(200).json(allUsers)
    }catch(err){
        res.status(401).json(err)
    }
}
// Admin Update User
exports.updateAdUsers=async(req,res)=>{
    console.log("Inside dcdwcdfdvcds");
    const {uId}=req.params
    const {username,password,email,profileImage}=req.body
    const profile=req.file?req.file.filename:profileImage
    const encryptPassword=password
    if(encryptPassword!=""){
        encryptPassword=encrypt(password,process.env.N_CRYPT_SECRET_KEY)
    }
    try{
        const validateEmail = (email) => {
            return email.match(
              /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
          };
          if(validateEmail(email)){
            const profilUpdate=await users.findByIdAndUpdate({_id:uId},{
                username,email,password:encryptPassword,profileImage:profile
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
// Admin delete USer
exports.deleteUser=async(req,res)=>{
    const {uId}=req.params
    try{
        if(uId){
        await users.deleteOne({_id:uId})
        res.status(200).json("Deleted SuccessFully!!")
        }
    }catch(err){
        res.status(401).json(err)
    }
}
// Get ALL Reviews
exports.getAllReviews=async(req,res)=>{
    try{
        const allReviews=await reviews.find().sort({createdAt:-1})
        res.status(200).json(allReviews)
    }catch(err){
        res.status(401).json(err)
    }
}
// Add Review Report
exports.addReviewRepots=async(req,res)=>{
    const {userName,ratingPoints,feedback,reason,reviewId}=req.body
    try{
       const newReviewReport= new reviewReports({
        userName,ratingPoints,feedback,reason,reviewId
       })
       await newReviewReport.save()
       res.status(200).json(newReviewReport)
    }catch(err){
        res.status(401).json(err)
    }
}
// get All Review Reports
exports.getAllReviewsReports=async(req,res)=>{
    try{
        const allReportedReviews=await reviewReports.find().sort({createdAt:-1})
        if(allReportedReviews){
            res.status(200).json(allReportedReviews)
        }else{
            res.status(404).json("No Reported Reviews!!!")
        }
    }catch(err){
        res.status(401).json(err)
    }
}
// delete Review Reports
exports.deleteReviewReports=async(req,res)=>{
    const {rrId}=req.params
    try{
        await reviewReports.deleteOne({_id:rrId})
        res.status(200).json("Reported Review Deleted Successfully!!")
    }catch(err){
        res.status(401).json(err)
    }
}
// get all workers
exports.getAllWorkers = async (req, res) => {
    try {
      const allWorkers = await workers.find().sort({createdAt:-1})
      res.status(200).json(allWorkers)
    } catch (err) {
      res.status(401).json(err);
    }
  };
// admin update
exports.updateStatus=async(req,res)=>{
    const {id}=req.params
    const {status}=req.body
    try{
        const statusChangedWorker=await workers.findByIdAndUpdate({_id:id},{status},{new:true})
        await statusChangedWorker.save()
        res.status(200).json(statusChangedWorker)
    }catch(err){
        res.status(401).json(err)
    }
}
// get all usersReviewsWorkers counts
exports.getAllCounts=async(req,res)=>{
    try{
        const usersCount=await users.find().count()
        const workersCount=await workers.find().count()
        const reviewsCount=await reviews.find().count()
        res.status(200).json({usersCount,workersCount,reviewsCount})
    }catch(err){
        res.status(401).json(err)
    }
}