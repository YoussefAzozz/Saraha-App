import multer from "multer";
import AppError from "../utils/AppError.js";


export const validFileExtensions = {
    image:['image/png','image/jpg','image/jpeg','image/gif','image/svg'],
    file: ['application/pdf','application/msword']
}
// const mapFileExtens = new Map();
// mapFileExtens.set('image',['image/png','image/jpg','image/jpeg','image/gif','image/svg']);
// mapFileExtens.set('file',['application/pdf','application/msword']);
// export const filesExts = mapFileExtens;

export function uploadFile(validationFile=[]) {

    const storage = multer.diskStorage({});

    function fileFilter(req,file,cb){   
        
        if (!validationFile.includes(file.mimetype))
            cb(new AppError("In-Valid Extension Format"),false);
        
        cb(null,true);
    }

    const upload = multer({fileFilter,storage});

    return upload;
}
