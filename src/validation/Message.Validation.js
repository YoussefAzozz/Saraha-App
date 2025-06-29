import joi from "joi";



export const addMessageSchema = {

    body: joi.object({

        title: joi.string().min(3).max(50).required(),
        description: joi.string().min(3).max(200).required(),
    }).required(),

    params: joi.object({
        userId: joi.string().pattern(new RegExp(/^[a-fA-F0-9]{24}$/))
        .messages({'string.pattern.base': 'userId must be a valid 24-character hexadecimal string.'})
    }).required()
    
}




export const deleteUpdateMessage = {

    body:joi.object({
        title: joi.string().min(3).max(50),
        description: joi.string().min(3).max(200),
        userId: joi.string().pattern(new RegExp(/^[a-fA-F0-9]{24}$/))
        .messages({'string.pattern.base': 'userId must be a valid 24-character hexadecimal string.'}).required()

    }).required(),

    params: joi.object({

        messageID: joi.string().pattern(new RegExp(/^[a-fA-F0-9]{24}$/))
        .messages({'string.pattern.base': 'userId must be a valid 24-character hexadecimal string.'}).required()

    }).required()

}
