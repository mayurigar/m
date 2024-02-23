const mongoose=require ('mongoose');

const ipdSchema = new mongoose.Schema({

    ipdID:{
        type:String,
    },

    ipdVital: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"ipd-vital"
        },
    ]

});


 module.exports = mongoose.model('ipd',ipdSchema);