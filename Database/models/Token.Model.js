import { Schema,model } from "mongoose";


const tokenSchema = new Schema({

    tokenValue:{
        type:String,
        required:true
    },
    expired:{
        type:Boolean,
        default:false,
    },
    user:{
        type:Schema.ObjectId,
        ref:"User",
        required:true
    }

},{
    timestamps:true
});

export const tokenModel = model("Token",tokenSchema);