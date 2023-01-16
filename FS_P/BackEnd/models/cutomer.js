const  mongoose  = require("mongoose")

const eventSchema = mongoose.Schema({
   
    name: { type:String, required:true},
    email: { type: String, required:true},
    nic:{ type:String,required:true},
    telephone:{ type:Number,required:true},

});

module.exports = mongoose.model('Customer',eventSchema);