import nodemailer from "nodemailer";
import { htmlCode } from "./HTMLConfirmEmail.js";
import { resetPasswordHtml } from "./SendResetCode.js";


export const sendEmail = async(options)=>{

    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD
        },
        tls:{
            rejectUnauthorized:false
        }
      });
        
    // send mail with defined transport object
    await transporter.sendMail({
    from: `"Maddison Foo Koch 👻" <${process.env.EMAIL}>`, // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: "Hello world?", // plain text body
    html: htmlCode(`${process.env.BASE_URL}/auth/verify/${options.userToken}`) // html body
    });

}


export const sendResetCode = async(options)=>{

  const transporter = nodemailer.createTransport({
      service:"gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      },
      tls:{
          rejectUnauthorized:false
      }
    });
      
  // send mail with defined transport object
  await transporter.sendMail({
  from: `"Maddison Foo Koch 👻" <${process.env.EMAIL}>`, // sender address
  to: options.email, // list of receivers
  subject: options.subject, // Subject line
  text: "Hello world?", // plain text body
  html: resetPasswordHtml(`${options.forgetPassCode}`) // html body
  });

}
