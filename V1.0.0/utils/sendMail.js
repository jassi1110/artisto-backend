const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'jany.torphy35@ethereal.email',
      pass: 'N8AJYGttxXQYrmDhqX'
  }
});


exports.sendEmail = async(receiver,otp)=>{ 
  let info = await transporter.sendMail({
    from: 'Artisto <jany.torphy35@ethereal.email>', // sender address
    to: receiver, // list of receivers
    subject: "OTP", // Subject line
    text: `OTP for registration is ${otp}`, // plain text body
  });


  console.log("Message sent: %s", info.messageId);
 
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}