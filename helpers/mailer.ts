import User from "@/models/User";
import nodemailer from "nodemailer";
import bcrypt from 'bcrypt'

export const sendEmail = async ({email,emailType,userId}:any) => {
try {
  
  const hashedToken = await bcrypt.hash(userId.toString(),10)

 if(emailType === "VERIFY"){
  await User.findByIdAndUpdate(userId,{
    verifyToken:hashedToken,
    verifyTokenExpiry:Date.now() + 3600000
  })
 }else if (emailType === "RESET"){
  await User.findByIdAndUpdate(userId,{forgotPasswordToken:hashedToken
    ,forgotPasswordTokenExpiry:Date.now()  + 360000
  })
 }
const transporter  = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "09459e589462b0",// 🔥❌
    pass: "ab19372ca8ecf4"// ❌❌These things must be in .env file
  }
});
const mailOptions = {
  from: 'ibrahim@email.com', // sender address
  to: email, // list of receivers
  subject: emailType === "VERIFY" ? "Verify your email" : "Reset Password", // Subject line
  text: "Hello world?", // plain text body
  html: `<p>Click  <a href="${process.env.DOMAIN}/verifyemail">here</a> to ${emailType ==="VERIFY" ? "Verify your email" : "Reset your password"} or copy paste the link below in your browser
  <br><br>
  ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>
  `, // html body
}
const mailResponse = await transporter.sendMail(mailOptions);
} catch (error:any) {
  throw new Error(error.message);
}
}