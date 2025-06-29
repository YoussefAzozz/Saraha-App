

const globalErrorHandlong = (error,req,res,next)=>{
    return res.status(error.statusCode || 400).json({message:error.message , stack :error.stack});
}

export default globalErrorHandlong;