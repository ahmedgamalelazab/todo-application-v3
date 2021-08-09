const User = require('../model/user');

const bcrypt = require('bcrypt');

//this is a function not an object
const {genJwt} = require('../utils/genJWT');

const {checkForNull} = require('../utils/checkForNulls');


module.exports.login = async (req,res,next)=>{

    const {email , password} = req.body;

    const result = await checkForNull(email,password);

    if(result === false){
        return res.status(400).json({
            success:false,
            data:"invalid request"
        })
    }else{

        //search in the database for the userEmail that being provided`
        let [user] = await User.query().where({
            email:email,
        })

        if(!user){
            return res.status(404).json({
                success:false,
                data:"invalid userEmail or password !"
            })
        }

        //lets decrypt the password 

        const compare = await bcrypt.compare(password,user['password']);

        console.log(user['id']);

        const token = await genJwt(user['id']);

        if(compare === false){
            return res.status(404).json({
                success:false,
                data:"invalid userEmail or password !"
            })
        }


        return res.status(200).json({
            success:true,
            data:{
                userFullName:`${user['Fname']} ${user['Lname']}`,
                userEmail:`${user['email']}`,
                jsonToken:token,
            }
        })
    }
}