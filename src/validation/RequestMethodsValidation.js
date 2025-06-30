


export const validationMethod = (schema)=>{
    
    return (req,res,next)=>{
        const allDataFromMethods = {...req.body , ...req.params , ...req.query};
        const validateSchema = schema.validate(allDataFromMethods,{abortEarly:false});
        if (validateSchema.error) {
            return res.json({message:"Error Validation",Errors:validateSchema.error.details});
        }

        return next();
    }
}
