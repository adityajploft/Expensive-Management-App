const transtionModel = require("../Models/transtionModel");
const moment = require("moment");

const getAllTransection = async (req, res) => {
  try {
    const { frequency, selectdate, type } = req.body;
    const transection = await transtionModel.find({
      ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: selectdate[0],
              $lte: selectdate[1],
            },
          }),

      userid: req.body.userid,
      ...(type !== "all" && { type }),
    });
    console.log(transection)
    return res.status(200).json(transection);
  
  } catch (error) {
    console.log("Error");
    res.status(500).json(error);
  }
};
const addAllTransection = async (req, res) => {
  try {
    const newTransetion = new transtionModel(req.body);

    await newTransetion.save();
    res.status(201).send("transtion created");
  } catch (error) {
    console.log("Error");
    res.status(500).json(error);
  }
};
const editAllTransection = async(req,res) =>{
  try {
   await transtionModel.findOneAndUpdate({_id:req.body.transectionId}, req.body.payload)
   res.status(200).json("Edit Successfully done")
   
  } catch (error) {
   console.log(error)
   res.status(500).json(error)
   
  }

}
const deleteAllTransection = async(req,res)=>{
try {
console.log(req.body.transectionId)
await transtionModel.findOneAndDelete({ _id: req.body.transectionId 
});
res.status(200).send("Transaction Deleted!");
} catch (error) {
console.log(error);
res.status(500).json(error);
}
}

module.exports = { getAllTransection, addAllTransection ,editAllTransection ,deleteAllTransection};
