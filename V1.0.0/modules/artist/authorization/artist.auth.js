const cryptoJS = require('crypto-js')
const reg = require('../../../setups/mongo.setup')
const valid = require('../../../utils/sendOTP')
const mail = require('../../../utils/sendMail')
const jwt = require('jsonwebtoken')
const logger = require('../../../setups/pino.setup')
require('dotenv').config()

exports.verifyEmail = async (req, res) => {
    try {
        const { otp ,email} = req.body;

        const prev_email = await reg.checkOTP('validation', email);
        
        const validate = valid.verify(otp,prev_email[0].otp)
        if(!validate){
            logger.error("Request Errored")
            return res.status(401).json({
                status:false,
                message:"OTP Invalid"
            })
        }

        else{
            logger.info("Request Completed")
            return res.status(200).json({
                status:true,
                message:"Email verified successfully"
            })
        }
        
    } catch (error) {
        logger.error("Errored");
        return res.status(401).json({
            status: false,
            err: `${error}`
        })
    }
}
exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        const prev_email = await reg.checkOTP('validation', email);

        if (prev_email[0] != null) {
            // logger.error('Request Errored');
            return res.status(401).json({
                status: false,
                message: "Email with this user already exist."
            })
        }
        
        const token = valid.GenerateOTP();
        
        const key = {
            email: email,
            otp: token
        }
        
        const d = await reg.addOTP('validation', key)
        
        if (!d) {
            // logger.error('Request Errored');
            return res.status(401).json({
                status: false,
                message: "Error Throwed"
            })
        }
        
        const sent = await mail.sendEmail(email, token);
        
        // logger.info('Request Completed');
        return res.status(200).json({
            status: true,
            message: "OTP sent successfully;"
        })
        
    } catch (error) {
        logger.error("Errored");
        return res.status(401).json({
            status: false,
            err: `${error}`
        })
    }
}

exports.newArtist = async (req, res) => {
    try {
        const { username, password, passwordCheck, email, dob, gender, category, phone } = req.body

        if (!req.body) {
            return res.status(401).json({
                status: false,
                message: "Body empty.Please fill the details"
            })
        }

        if (!username || !password || !passwordCheck || !email || !dob || !gender || !category || !phone) {
            return res.status(401).json({
                status: false,
                message: "Field Empty. Please fill all the details"
            })
        }

        const x = await reg.checkRegistration('artist', phone);

        if (x[0] != null) {
            return res.status(401).json({
                status: false,
                message: "User already exist."
            })
        }
        if (password !== passwordCheck) {
            return res.status(401).json({
                status: false,
                message: "Password does not match"
            })
        }

        const encrypted = cryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString();
        const key = {
            username: username,
            password: encrypted,
            email: email,
            dob: dob,
            gender: gender,
            category: category,
            phone: phone
        }
        const d = await reg.addArtist('artist', key);

        if (!d) {
            return res.status(401).json({
                status: false,
                message: "Error received"
            })
        }

        return res.status(200).json({
            status: true,
            message: "Artist Successfully Added."
        })



    } catch (error) {
        return res.status(401).json({
            status: false,
            err: `${error}`
        })
    }
}

exports.loginArtist = async (req, res) => {
    try {
        z = req.fields;
        // console.log(z);
        z = JSON.parse(JSON.stringify(z));
        console.log(z);

        const {phone,password} = z;
        console.log(z.phone);
        console.log(z.password);
        if (!req.body) {
            logger.info("Request Completed");
            return res.status(401).json({
                status: false,
                message: "Body Empty."
            })
        }
        
        if (!phone || !password) {
            logger.info("Request Completed");
            return res.status(401).json({
                status: false,
                message: "Fields Empty"
            })
        }
        
        const x = await reg.checkRegistration('artist', Number(phone));
        
        if (x[0] === null) {
            logger.info("Request Completed");
            return res.status(401).json({
                status: false,
                message: "User doesn't exist"
            })
        }

        var bytes = cryptoJS.AES.decrypt(x[0].password, process.env.SECRET_KEY);
        var decrypted = bytes.toString(cryptoJS.enc.Utf8);
        if (decrypted === password) {
            const accessToken = jwt.sign({ id: `${x[0].phone}` }, process.env.JWT_KEY);
            logger.info("Request Completed")
            return res.status(200).json({
                status: true,
                message: "User Successfully Logged In",
                accessToken: accessToken
            })
        }
        else {
            logger.info("Request Completed")
            return res.status(401).json({
                status: false,
                message: "Login Failed"
            })
        }
        
    } catch (error) {
        logger.error("Request Errored")
        return res.status(401).json({
            status: false,
            err: `${error}`
        })
    }
}

