import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import CryptoJS from "crypto-js";

const userSchema= new Schema({

    firstName:{
        type:String,
    },
    lastName:{
        type:String
    },
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true
    },
    confirmEmail:{
        type:Boolean,
        default:false
    },
    password:{
        type:String,
        required:true,
    },
    age:{
        type:Number
    },
    gender:{
        type:String,
        default:'Male',
        enum:['Male','Female']
    },
    phone:{
        type:String
    },
    role:{
        type:String,
    },
    forgetPassCode:{
        type:String,
        default: null
    },
    changePasswordDate:{
        type: Date,
        default: null
    },
    isLoggedOff:{
        type: Boolean,
        default: false
    },
    profileImage:{secure_url:String , public_id:String},
    coverImages:[{secure_url:String , public_id:String}],
    provider:{
        type:String,
        default: 'SYSTEM',
        enum:['SYSTEM' , 'FACEBOOK','GOOGLE','GITHUB']
    }
},{
    timestamps:true
});


userSchema.pre('save',function(next){
    if (this.password.length < 20) {
        this.password = bcrypt.hashSync(this.password,parseInt(process.env.SALT_ROUND));
        this.firstName = this.firstName.charAt(0).toUpperCase()+this.firstName.slice(1);
        this.lastName = this.lastName.charAt(0).toUpperCase()+this.lastName.slice(1);
    }
    this.phone = CryptoJS.AES.encrypt(this.phone, process.env.SECRET_KEY).toString();
    next();
});


userSchema.post("find", function (docs) {
    if (Array.isArray(docs)) {
      // Decrypt phone numbers for multiple documents
      docs.forEach( doc => {
        if (doc.phone && process.env.SECRET_KEY) {
          let bytes = CryptoJS.AES.decrypt(doc.phone, process.env.SECRET_KEY);
          doc.phone = bytes.toString(CryptoJS.enc.Utf8);
        }
      }); 
    }    
});

userSchema.post("findOne",{document:false , query:true} ,function (doc) {
    if (doc) {
        let bytes = CryptoJS.AES.decrypt(doc.phone, process.env.SECRET_KEY);
        doc.phone = bytes.toString(CryptoJS.enc.Utf8);
    }
});


const userModel = model("User",userSchema);

export default userModel;
