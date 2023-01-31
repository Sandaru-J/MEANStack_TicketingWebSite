const  mongoose  = require("mongoose")

const eventSchema = mongoose.Schema({
    title: { type:String, required:true},
    date: { type: String, required:true},
    organization:{ type:String,required:true},
    location: { type:String, required:true},
    capacity: { type: Number, required:true},
    category:{ type:String,required:false},

    TicketC1:{type:String,required:true},
    //TicketC2:{type:String,required:false},
    //TicketC3:{type:String,required:false},

    TicketP1:{type:Number,required:true},
    //TicketP2:{type:Number,required:false},
    //TicketP3:{type:Number,required:false},

    TicketQ1:{type:Number,required:true},
    //TicketQ2:{type:Number,required:false},
    //TicketQ3:{type:Number,required:false},

    description:{type:String,required:true},
    imagePath: { type: String, required: false }
});

module.exports = mongoose.model('Event',eventSchema);  