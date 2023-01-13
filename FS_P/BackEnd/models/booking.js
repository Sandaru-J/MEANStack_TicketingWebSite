const  mongoose  = require("mongoose")

const eventSchema = mongoose.Schema({
   
    name: { type:String, required:true},
    email: { type: String, required:true},
    nic:{ type:String,required:true},
    address: { type:String, required:true},
    telephone:{ type:Number,required:true},
    total:{ type:Number,required:true},
    eventID:{ type:String,required:true},
    eventName:{ type:String,required:true}

});

module.exports = mongoose.model('Booking',eventSchema);
