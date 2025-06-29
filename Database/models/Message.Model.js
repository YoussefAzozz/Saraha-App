import { model, Schema, Types } from "mongoose";



const messageSChema = new Schema({

    title:{
        type:String,
        required:String
    },
    description:{
        type:String,
        required:String
    },
    userId:{
        type: Types.ObjectId,
        ref:'User',
        required:true
    }
    
},{
    timestamps:true
});




const messageModel = model("Message",messageSChema);

export default messageModel;