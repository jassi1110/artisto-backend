const cryptoJS = require('crypto-js')
const reg = require('../../../setups/mongo.setup')
const mail = require('../../../utils/sendMail')
const logger = require('../../../setups/pino.setup')
const {recoML} = require('../../../utils/integrationModel')


exports.getDetails = async (req, res) => {
    try {

        const  name  = req.query.name
        // console.log(name)
        if (name == null) {
            // console.log("Hello World")
            const userDetails = await reg.artistDetails('ml');

            if(!userDetails){
                logger.error("Request Errored");
                return res.status(401).json({
                    status:false,
                    message:"Details not fetched"
                })
            }
            else{
                logger.info("Request Completed")
                return res.status(200).json({
                    status:true,
                    Details:userDetails
                })
            }
        }
        else {
            const d = await recoML(name);
            if(!d){
                logger.error("Request Errored");
                return res.status(401).json({
                    status:false,
                    message:"No Artist found" 
                })
            }
            else{
                logger.info("Request Completed");
                return res.status(200).json({
                    status:true,
                    message : d
                })
            }
        }
    } catch (error) {
        logger.error("Request Errored")
        return res.status(401).json({
            status:false,
            err:`${error}` || "Error Found"
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
            email: id
        }

        const key = {
            $set: {
                username: username,
                dob: dob,
                gender: gender,
                category: category
            }
        }

        const d = reg.updateArtist('artist', key, ID);

        if (!d) {
            logger.error("Request Completed")
            return res.status(401).json({
                status: false,
                err: "Artist not updated"
            })
        }
        else {
            logger.info("Request Completed");
            return res.status(200).json({
                status: true,
                message: "Updated Successfully"
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

