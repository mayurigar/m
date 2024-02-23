const ipdModel = require("../model/ipdModel");




exports.createdipd = async (req, res) => {
  const data = req.body;
    try {

      const newipdDetails = new ipdModel(data);


        const  createdIpd =  await newipdDetails.save();
  
      res.status(201).json({
        message: "ipd  created successfully",
        ipdDetails: createdIpd,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.massage });
    }
  };
