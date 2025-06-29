import messageModel from "../../../../Database/models/Message.Model.js";
import catchError from "../../../utils/ErrorHandling.js";


export const getAllMessages = catchError(async(req,res,next)=>{

    if (req.query?.userId) {
        const {userId} = req.query;

        const messages = await messageModel.find({userId:userId}).populate({path:"userId",select:'email userName -_id'});

        return messages.length ? res.json({message:"Done",messages}) : res.json({message:"No user Messages"});
    }

    const messages = await messageModel.find().populate({path:"userId",select:'email userName -_id'});

    return messages.length ? res.json({message:"Done",messages}) : res.json({message:"No user Messages"});

});

export const addMessage = catchError(async(req,res,next)=>{

    const {userId} = req.params;
    const {title , description} = req.body;
    const message = await messageModel.create({title,description,userId});
    return message ? res.json({message:"Done",message}) : res.json({message:"No user Messages"});
});

export const deleteMessage = catchError(async(req,res,next)=>{


    const message = await messageModel.findOneAndDelete({_id:req.params.messageID , userId:req.body.userId});
    console.log(message);
    
    return message ? res.json({message:"Done"}) : res.json({message:"Not Deleted"});

});


export const updateMessage = catchError(async(req,res,next)=>{

    const updatedMessage = await messageModel.findOneAndUpdate({_id:req.params.messageID , userId:req.body.userId},req.body,{new:true});

    return updatedMessage ? res.json({message:"Done",updatedMessage}) : res.json({message:"Not Updated"});

});