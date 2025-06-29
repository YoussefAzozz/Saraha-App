

// const dataMethods = ['body','params','query','headers','file'];


// export const validationMethod = (schema)=>{
    
//     return (req,res,next)=>{
//         const validationErrors = [];
//         dataMethods.forEach(key =>{
//             if (schema[key]) {
//                 const validateSchema = schema[key].validate(req[key],{abortEarly:false});
//                 if (validateSchema.error) {
//                     validationErrors.push(validateSchema.error);
//                 }
//             }
//         });
//         if (validationErrors.length) {
            
//             return res.json({message:"Error Validation",Errors:validationErrors});
//         }

//         return next();
//     }
// }


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
