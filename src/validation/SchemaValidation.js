
import joi from "joi";


export const signupSchema = 
    
   joi.object({
        firstName:  joi.string().alphanum().min(3).max(20),
        lastName:  joi.string().alphanum().min(3).max(20),
        userName:  joi.string().alphanum().min(3).max(50).required(),
        email:  joi.string().email({minDomainSegments:2 , maxDomainSegments:4 , tlds:{allow:['com','net','edu','eg']}}).lowercase().required(),
        password:  joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).lowercase().required(),
        cPassword:  joi.string().valid(joi.ref('password')).required(),
        phone: joi.string().required(),
        age: joi.number().integer().positive().min(10).max(95),
        role: joi.string().valid('normal', 'admin').required()
        // confirmEmail : joi.boolean().truthy("1").falsy("0").sensitive(),
        // profileImage : joi.string(),
        // coverImages : joi.array().items(joi.string().required()).min(1).max(5)
    }).required()


export const loginSchema =  joi.object({
    email:  joi.string().email({minDomainSegments:2 , maxDomainSegments:4 , tlds:{allow:['com','net','edu','eg']}}).lowercase().required(),
    password:  joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).lowercase().required()
}).required()



export const updateUserSchema = 
    joi.object({
        userName:  joi.string().alphanum().min(3).max(50),
        email:  joi.string().email({minDomainSegments:2 , maxDomainSegments:4 , tlds:{allow:['com','net','edu','eg']}}).lowercase(),
        phone: joi.string().pattern(new RegExp(/^\+?(\d{1,3})?[-. (]*\d{3}[-. )]*\d{3}[-. ]*\d{4}$/))
    }).required();


export const deleteUserSchema = joi.object({
    userId: joi.string().pattern(new RegExp(/^[a-fA-F0-9]{24}$/))
            .messages({'string.pattern.base': 'userId must be a valid 24-character hexadecimal string.'})
}).required()


export const updateUserPassword = joi.object({
    password:  joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).lowercase().required()
}).required()


export const forgotPasswordSchema = joi.object({
    email:  joi.string().email({minDomainSegments:2 , maxDomainSegments:4 , tlds:{allow:['com','net','edu','eg']}}).lowercase().required(),
    password:  joi.string().pattern(new RegExp("^[a-zA-Z0-9]+$")).lowercase().required(),
    confirmPassword:  joi.string().valid(joi.ref('password')).required(),
    forgetPassCode: joi.string().pattern(new RegExp("^[1-9]{4}$")).required()
}).required(); 