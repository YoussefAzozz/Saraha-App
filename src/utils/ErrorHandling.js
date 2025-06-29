import AppError from "./AppError.js"


const catchError = (fun) => {
    
    return (req,res,next)=>{
        return fun(req,res,next).
        catch(err => next(new AppError(err.message)));
    }
}

export default catchError;
