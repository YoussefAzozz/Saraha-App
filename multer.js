import multer from "multer";
import { nanoid } from "nanoid";
import AppError from "./src/utils/AppError.js";
import fs from "fs";

export const validFileExtensions = {
    image:['image/png','image/jpg','image/jpeg','image/gif','image/svg'],
    file: ['application/pdf','application/msword']
}


export function uploadFile(customPath,validationFile=[]) {
    
    const filePath = `uploads/${customPath}`;

    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath,{recursive:true});
    }
    
    const storage = multer.diskStorage({

        destination: (req,file,cb)=>{
            cb(null,filePath);
        },
        filename:(req,file,cb)=>{
            const fullName = nanoid()+"_"+file.originalname;
            file.finalDest = `${filePath}/${fullName}`;
            cb(null,fullName);
        }
    });

    function fileFilter(req,file,cb) {   

        if (!validationFile.includes(file.mimetype))
            cb(new AppError("In-Valid Extension Format"),false);
        
        cb(null,true);
    }

    const upload = multer({dest:'uploads',fileFilter,storage});

    return upload;
}
