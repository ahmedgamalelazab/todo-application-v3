const {checkForNull} = require('../utils/checkForNulls');

const User = require('../model/user');

const jwt = require('jsonwebtoken');

module.exports.authMiddleware = async(req,res,next)=>{

    const userToken = req.headers['x-auth-token'];

    const result = await checkForNull(userToken);
    
    if(result === false){
        return res.status(400).json({
            success:false,
            data:"your session is expired or invalid token!"
        })
    }else{

        let user_id  = undefined;

        //checking for internal errors in the database environment

        const userSecretChecking = checkForNull(process.env.USER_SECRET);

        if(userSecretChecking === false){
            return res.status(500).json({
                success:false,
                data:"internal server error, [environment error code 3]"
            })
        }
        //else
        await Promise.all(
            [
                (user_id = jwt.verify(userToken,process.env.USER_SECRET))
            ]
        );
        const [userDataRaw] = await User.query().where({id: user_id});

        req.userData = userDataRaw;

        next();

    }


}