import userModel from "../../../../Database/models/User.Model.js"
import catchError from "../../../utils/ErrorHandling.js";
import { sendEmail, sendResetCode } from "../../../email/SendEmail.js";
import { htmlCode } from "../../../email/HTMLConfirmEmail.js";
import AppError from "../../../utils/AppError.js";
import cloudinary from "../../../utils/cloudinary.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import { customAlphabet } from "nanoid";

const  checkUserRole = (role,userId,req,next)=> {
    
    if (role != "admin")  {
        return next(new AppError("UnAuthorized to delete user",403));
    }

    if (req.body?.userId) {
        userId = req.body.userId;
    }
    else if(req.params?.userId){
        userId = req.params.userId;
    }

    const checkObj = {
        userId:userId, role:role
    }

    return checkObj;

}


export const getAllUsers = catchError(async(req,res,next)=>{
    if (req.query.id) {
        const user = await userModel.findById(req.query.id);
        return user ? res.json({message:"Done",user}) : res.json({message:"In-Valid ID",user});
    }

    const allUsers = await userModel.find();

    return allUsers.length ? res.status(200).json({message:"Done",allUsers}) : res.json({message:"No users",allUsers});

});

export const myProfile = catchError(async(req,res,next)=>{

    const user = await userModel.findOne({_id:req.user.id}).select("firstName lastName userName age email phone profileImage coverImages");
    return user ? res.json({message:"Done",user}) : res.json({message:"User not found"});

});


export const updateUser = catchError(async(req,res,next)=>{
    let userToken = '';
    if (req.body?.phone) {
        const ciphertextPhone = CryptoJS.AES.encrypt(req.body.phone, process.env.SECRET_KEY).toString();
        req.body.phone = ciphertextPhone; 
    }
    if (req.body?.userName) {
         userToken = jwt.sign(
                {userName:req.body.userName , id:req.user._id},
                process.env.TOKEN_SIGNATURE, {expiresIn:'1d'}
            );
    }

    const updatedUser = await userModel.findByIdAndUpdate({_id:req.user._id},req.body,{new:true});

    const updatedToken = userToken || req.token;
    

    if (req.body?.email) 
        sendEmail({email:req.body.email ,userToken:updatedToken , subject:"Confirmation Email" , htmlCode});
    

    return updatedUser ? res.json({message:"Done",updatedUser,updatedToken}) : res.json({message:"Not Updated"});
    
});


export const deleteUser = catchError(async(req,res,next)=>{

    // const checkObj = checkUserRole(req.user.role,req.body.userId,req,next);
    const checkObj = checkUserRole(req.user.role,req.body.userId,req,next);
    const user = await userModel.findByIdAndDelete({_id:checkObj.userId});

    return user ? res.json({message:"Done",user}) : res.json({message:"Not Deleted"});

});


export const forgotPassword = catchError(async(req,res,next)=>{
    const {email , password , forgetPassCode} = req.body;
    
    const user = await userModel.findOne({email});
    
    if (!user) {
        return next(new AppError("Not Register Account",400));
    }
    
    if (user.forgetPassCode != forgetPassCode) 
        return next(new AppError("In-Valid Reset Password"));
    

    user.password = password;
    user.forgetPassCode=null;
    user.changePasswordDate = Date.now();
    await user.save();

    const userToken = jwt.sign(
            {userName:user.userName , id:user._id},
            process.env.TOKEN_SIGNATURE, {expiresIn:'1d'}
    ); 

    return res.json({message:"Done",user,userToken});
});

export const sendCode = catchError(async(req,res,next)=>{

    const {email} = req.body;
    const randomCode = customAlphabet('123456789',4);
    const user = await userModel.findOneAndUpdate({email},{forgetPassCode:randomCode()},{new:true});
    if (!user) {
        return res.json({message:"Account not registered"});
    }
    sendResetCode({email , subject:"Reset Password Code" ,forgetPassCode:user.forgetPassCode});
    return res.json({message:"Done",user});
});

export const uploadProfileImage = catchError(async(req,res,next)=>{

    const {secure_url , public_id} = await cloudinary.uploader.upload(req.file.path, {folder:`C40Saraha/user/${req.user.id}/profile`});
    const user = await userModel.findByIdAndUpdate({_id:req.user.id},
        {profileImage:{secure_url , public_id}}
        ,{new:true});

    return res.json({message:"Done",user});

});


export const coverImages = catchError(async(req,res,next)=>{

    const images=[];
    const coverImagesPath = `C40Saraha/user/${req.user.id}/cover`;
    
    for (const file of req.files) {
        const {secure_url , public_id} = await cloudinary.uploader.upload(file.path, {folder:coverImagesPath});
        images.push({secure_url , public_id});
    }

    const user = await userModel.findByIdAndUpdate({_id:req.user.id},
        {coverImages:images}
        ,{new:true});

    return res.json({message:"Done",user});

});

export const decryptUserRole = catchError(async(req,res,next)=>{
    let bytes = CryptoJS.AES.decrypt(req.user.role, process.env.SECRET_KEY);
    req.user.role = bytes.toString(CryptoJS.enc.Utf8);
    next();
});