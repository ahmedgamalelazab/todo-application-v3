const jwt = require('jsonwebtoken');


module.exports.genJwt = function(user_id){
    console.log(user_id);
    return new Promise((resolve,reject)=>{
        try{
            const token = jwt.sign(user_id,process.env.USER_SECRET);
            resolve(token);
        }catch(error){
            console.log(error);
            reject('error while generating the token!');
        }
    });
}