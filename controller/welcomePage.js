module.exports.welcome = async (req,res,next)=>{
    return res.status(200).json({
        success:false,
        data:"this supposed to be test welcome page"
    });
}