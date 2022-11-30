const cryptoJS = require('crypto-js')
const reg = require('../../../setups/mongo.setup')
const mail = require('../../../utils/sendMail')
const logger = require('../../../setups/pino.setup')

exports.getDetails = async (req, res) => {
    try {

        const id = req.user.id;
        const x = reg.checkRegistration('artist', id);

        return res.status(200).json({
            status: true,
            message: x[0]
        })

    } catch (error) {
        logger.error("Request Errored")
        return res.status(401).json({
            status: false,
            err: `${error}`
        })
    }
}

exports.updateDetails = async (req, res) => {
    try {
        const id = req.user.id;
        const { username, password, email, dob, gender, category } = req.body;

        if (!req.body) {
            logger.error("Request Errored")
            return res.status(401).json({
                status: false,
                message: "Body empty.Please fill the details"
            })
        }
        
        if (!username || !password || !dob || !gender || !category) {
            logger.error("Request Errored")
            return res.status(401).json({
                status: false,
                message: "Field Empty. Please fill all the details"
            })
        }

        const ID = {
            email:id
        }

        const key = {
            $set : {
                username:username,
                dob:dob,
                gender:gender,
                category:category
            }
        }

        const d = reg.updateArtist('artist',key,ID);

        if(!d){
            logger.error("Request Completed")
            return res.status(401).json({
                status:false,
                err:"Artist not updated"
            })
        }
        else{
            logger.info("Request Completed");
            return res.status(200).json({
                status:true,
                message:"Updated Successfully"
            })
        }
    } catch (error) {
        logger.error("Request Errored")
        return res.status(401).json({
            status:false,
            err:`${error}`
        })
    }
}