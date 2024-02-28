const reviews=require('../Models/ReviewModel')
const workers=require('../Models/registerModel')

exports.addReviews=async(req,res)=>{
    const {workerId,ratingPoints,feedback,userName,userPhoto}=req.body
    const userId=req.payload
    console.log(req.payload);
    console.log(req.body);
    try{
        // Check Review adding user and Worker is same?
        const WorkerUser=await workers.findOne({_id:workerId,userId})
        if(!WorkerUser){
            const existingReview=await reviews.findOne({workerId,userId})
        if(existingReview){
            res.status(406).json("Your already Submitted A Review On This Worker!!")
        }else{
            const newReview=new reviews({
                workerId,userId,ratingPoints,feedback,userName,userPhoto
            })
            await newReview.save()
            res.status(200).json(newReview)
        }
        }else{
            res.status(404).json("You can't add your own review!!!")
        }
        
    }catch(err){
        res.status(401).json(err)
    }
}

exports.getAWorkerReviews=async(req,res)=>{
    const {wId}=req.params
    try{
        const getAWorkerReviews=await reviews.find({workerId:wId}).sort({createdAt:-1})
        if(getAWorkerReviews.length>0){
            res.status(200).json(getAWorkerReviews)
        }else{
            res.status(200).json("Not Available!!!")
        }
        const totalRatings= getAWorkerReviews.map(review=>review.ratingPoints)
        if(totalRatings){
            function calculateAverage(totalRatings) {
                if (totalRatings.length === 0) {
                    return 0;
                }
                const sum = totalRatings.reduce((accumulator, currentValue) => accumulator + currentValue);
                const avarageReviews=sum / totalRatings.length
                const avarageReview=avarageReviews.toString()
                if(avarageReview.includes('.')){
                    if(avarageReview.split('.')[1].startsWith('5')){
                        return avarageReview
                    }else if(avarageReview.split('.')[1].length>1) {
                        const beforeDot=avarageReview.split('.')[0]
                        const afterDot=avarageReview.split('.')[1][0]
                        const join=beforeDot+'.'+afterDot
                        return join
                    }
                }else{
                    return avarageReview+'.0'
                }
            }
            const avarageReview=calculateAverage(totalRatings) 
            await workers.updateOne({_id:wId},{$set:{avarageReview}})
        }
    }catch(err){
        res.status(401).json(err)
    }
}

// Delete Review
exports.deleteReview=async(req,res)=>{
    const {id} =req.params
    try{
        await reviews.deleteOne({_id:id})
        res.status(200).json("Your Review Deleted Successfully!!")
    }catch(err){
        res.status(401).json(err)
    }
}
// Review high to low
exports.getHighToLowReview=async(req,res)=>{
    const {wId}=req.params
    try{
       const getHighToLowReview= await reviews.find({workerId:wId}).sort({ratingPoints:-1})
       if(getHighToLowReview){
        res.status(200).json(getHighToLowReview)
       }
    }catch(err){
        res.status(401).json(err)
    }
}
// Review low to high
exports.getLowToHighReview=async(req,res)=>{
    const {wId}=req.params
    try{
       const getLowToHighReview= await reviews.find({workerId:wId}).sort({ratingPoints:1})
       if(getLowToHighReview){
        res.status(200).json(getLowToHighReview)
       }
    }catch(err){
        res.status(401).json(err)
    }
}