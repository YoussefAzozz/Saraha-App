import userModel from "../../../../Database/models/User.Model.js";
import AppError from "../../../utils/AppError.js";
import catchError from "../../../utils/ErrorHandling.js";
import jwt from "jsonwebtoken";



export const auth = catchError(async (req,res,next)=>{


    const {authorization} = req.headers;

    if(!authorization)
    {
        return next(new AppError("Authorization is required",401));
    }

    if(!authorization?.startsWith(process.env.BEARER_TOKEN))
    {
        return next(new AppError("Authorization is required",401));
    }

    const token = authorization.split(process.env.BEARER_TOKEN)[1];

    const decodedToken = jwt.verify(token,process.env.TOKEN_SIGNATURE);

    if(!decodedToken?.id)
    {
        return next(new AppError("In-Valid token payload",400));
    }

    const user = await userModel.findById({_id:decodedToken.id});

    if ((parseInt(user.changePasswordDate?.getTime() / 1000) > decodedToken.iat) || user.isLoggedOff) {
        return next(new AppError("You logged out , Please login",400));
    }

    if(!user)
    {
        return next(new AppError("In-Valid account",400));
    }

    req.user = user;
    req.token = token;
    return next();

});

