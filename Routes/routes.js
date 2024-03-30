const express=require('express')
const router=express.Router()
const userController=require('../Controller/userController')
const jwtMiddleware = require('../MiddleWare/jwt')
const registerController = require('../Controller/registerController')
const reviewController=require('../Controller/reviewController')
const adminController=require('../Controller/adminController')
const multerConfig = require('../MiddleWare/multer')
const messageController=require('../Controller/messageController')
// signUp
router.post('/signUp',multerConfig.single("profileImage"),userController.register)
// Login
router.post('/login',userController.login)
// Google Login
router.post('/google',userController.googleLogin)
// addworkers
router.post('/register',jwtMiddleware,multerConfig.fields([{name:"registerImage",maxCount:1},{name:"workImages",maxCount:12}]),registerController.addWorker)
// getWorkers
router.get('/getWorkers',registerController.getWorkers)
// getAWorker
router.get('/getAWorker/:wId',registerController.getAWorker)
// addReview
router.post('/addReview',jwtMiddleware,reviewController.addReviews)
// getAworkerReview
router.get('/getAWorkerReview/:wId',reviewController.getAWorkerReviews)
// DeleteReview
router.delete('/deleteReview/:id',reviewController.deleteReview)
// getAworkerReviewHighToLow
router.get('/getAWorkerReviewHighToLow/:wId',reviewController.getHighToLowReview)
// getAworkerReviewLowToHigh
router.get('/getAworkerReviewLowToHigh/:wId',reviewController.getLowToHighReview)
// getDecrypting env
router.get('/getDecryptedEnv',userController.getDecryptingEnv)
// Update UserProfile
router.put('/updateUserProfile',jwtMiddleware,multerConfig.single("profileImage"),userController.updateUserProfile)
// getUserWorkDetails
router.get('/getUserWorkDetails',jwtMiddleware,registerController.getLoginedUserWorks)
// DeleteWorker
router.delete('/deleteWorker/:wId',registerController.deleteWorker)
// Update Worker
router.put('/updateWorker/:wId',jwtMiddleware,multerConfig.fields([{name:"registerImage",maxCount:1},{name:"workImages",maxCount:12}]),registerController.updateWorker)

// Admin

// Admin Get all Users
router.get('/getAdallUsers',adminController.getAllUsers)
// Admin Update userData
router.put('/updateAdUsers/:uId',jwtMiddleware,multerConfig.single("profileImage"),adminController.updateAdUsers)
// Admin Delete User
router.delete('/deleteUser/:uId',adminController.deleteUser)
// get All Reviews
router.get('/getAllReviews',adminController.getAllReviews)
// add Review Reports
router.post('/addreportReview',adminController.addReviewRepots)
// Get all Reported Reviews
router.get('/getReportedReviews',adminController.getAllReviewsReports)
// Reported Review
router.delete('/deleteReportReview/:rrId',adminController.deleteReviewReports)
// get All wrokers
router.get('/getAllWorkersAdmin',adminController.getAllWorkers)
// update status
router.put('/updateStatus/:id',adminController.updateStatus)
// get all Counts
router.get('/getAllCount',adminController.getAllCounts)

// Help/Chat

// delete room
router.delete('/deleteRoom/:id',messageController.deleteRoom)
// clear chat
router.delete('/clearChat/:roomId',messageController.clearChat)
// delete Message
router.delete('/deleteMessage/:id',messageController.deleteMessage)
module.exports=router