const ipdVitalmodel = require("../model/ipdVitalmodel");
const IPD = require("../model/ipdModel");

exports.createdipdVital = async (req, res) => {
    const { ipdID } = req.params;
  
    const newipdVitalData = req.body;
  
    try {
      const findPatient = await IPD.findOne({ ipdID: ipdID });
  
      if (!findPatient) {
        res.status(404).json({ message: "Patient not found" });
        return;
      }
  
      const newipdVitalDetails = new ipdVitalmodel({
        ...newipdVitalData,
        ipdID: findPatient.ipdID,
        patientID: findPatient._id,
        date: Date.now(),
      });


        const  createdIpdVitails =  await newipdVitalDetails.save();

        findPatient.ipdVital.push(createdIpdVitails._id)
         await findPatient.save();
  
      res.status(201).json({
        message: "ipd vital created successfully",
        ipdVitalDetails: createdIpdVitails,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.massage });
    }
  };

exports.getipdVital=async(req,res)=>{
    const { ipdID } = req.params;

    try {
        const ipdVital = await ipdVitalmodel.find({ ipdID: ipdID });
        res.status(200).json({success:true, data:ipdVital});
    } catch (error) {
        console.log(error);
    }
};

exports.updateipdVital=async(req,res) => {
  const _id = req.params;
  const newipdVitalData = req.body;
  

  try {
      
      const updateipdVitalType = await ipdVitalmodel.findByIdAndUpdate(_id, newipdVitalData); 
      
      if (!updateipdVitalType) {
          return res.status(404).json({success: false, message: 'Document not found'});
      }

      res.status(200).json({success: true, data: updateipdVitalType});
  } catch (error) {
      console.log(error);
      res.status(500).json({success: false, message: 'An error occurred'});
  }
};

exports.deleteipdVital=async(req,res) => {
  const _id = req.params;
  

    try {


      const deleteipdVitalType = await ipdVitalmodel.findByIdAndDelete(_id); 
      
      if (!deleteipdVitalType) {
          return res.status(404).json({success: false, message: 'Document not found'});
      }

      res.status(200).json({success: true, data: deleteipdVitalType});
  } catch (error) {
      console.log(error);
      res.status(500).json({success: false, message: 'An error occurred'});
  }
};
