const workers = require("../Models/registerModel");

// add worker
exports.addWorker = async (req, res) => {
  console.log("inside register controller");
  const {
    name,
    phoneNumber,
    whatsappNumber,
    categories,
    experience,
    workingDays,
    availableTime,
    address,
    paymentMode,
    state,
    city,
    place,
  } = req.body;
  const userId = req.payload;
  const registerImg=req.files.registerImage[0].filename
  const {  workImages } = req.files;
  console.log(registerImg);
  try {
    const existingWorker = await workers.findOne({ name });
    if (existingWorker) {
      res.status(406).json("This User Is already Exist!!");
    } else {
      console.log("add new worker");
      const newWorker = new workers({
        registerImage:registerImg,
        name,
        phoneNumber,
        whatsappNumber,
        categories,
        experience,
        workingDays,
        availableTime,
        address,
        paymentMode,
        state,
        city,
        place,
        workImages,
        userId,
        avarageReview: "",
        status:"pending"
      });
      await newWorker.save();
      console.log(newWorker);
      res.status(200).json(newWorker);
    }
  } catch (err) {
    res.status(401).json(err);
  }
};

// Get all Workers
exports.getWorkers = async (req, res) => {
  const searchKey = req.query.search;
  const city = searchKey.split(",")[0];
  const query={
     city:{$regex:city,$options:"i"},
     status:'approved'
  }
  try {
    const allWorkers = await workers.find(query).sort({createdAt:-1})
    res.status(200).json(allWorkers)
  } catch (err) {
    res.status(401).json(err);
  }
};
// Get a Worker
exports.getAWorker = async (req, res) => {
  const { wId } = req.params;
  try {
    const worker = await workers.find({ _id: wId });
    res.status(200).json(worker);
  } catch (err) {
    res.status(401).json(err);
  }
};
// getLoginedUserWorks
exports.getLoginedUserWorks=async(req,res)=>{
  const userId=req.payload
  try{
    const loginedUserWorks=await workers.find({userId})
    if(loginedUserWorks){
      res.status(200).json(loginedUserWorks)
    }else{
      res.status(403).json("You are not a worker If you are a worker please register!!")
    }
  }catch(err){
    res.status(401).json(err)
  }
}
// Delete a Worker
exports.deleteWorker=async(req,res)=>{
  const {wId}=req.params
  try{
    if(wId){
      await workers.deleteOne({_id:wId})
      res.status(200).json("Deleted Successfully")
    }
  }catch(err){
    res.status(401).json(err)
  }
}
// Update a worker Details
exports.updateWorker=async(req,res)=>{
  console.log("inside update controller");
  const {wId}=req.params
  const {
    name,
    phoneNumber,
    whatsappNumber,
    categories,
    experience,
    workingDays,
    availableTime,
    address,
    paymentMode,
    state,
    city,
    place,
    registerImage,
    workImages
  } = req.body;
  const registerUpdatedImage=req.files?.registerImage?req.files.registerImage[0].filename:registerImage
  const workUpdatedImages=req.files?.workImages?req.files.workImages:JSON.parse(workImages)
  try{
    const updatedWorker=await workers.findByIdAndUpdate({_id:wId},{
      registerImage:registerUpdatedImage,
        name,
        phoneNumber,
        whatsappNumber,
        categories,
        experience,
        workingDays,
        availableTime,
        address,
        paymentMode,
        state,
        city,
        place,
        workImages:workUpdatedImages
    },{new:true})
    await updatedWorker.save()
    res.status(200).json(updatedWorker)
  }catch(err){
    res.status(401).json(err)
  }
}
