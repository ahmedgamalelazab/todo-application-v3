
function checkNullData(data){
    for(let i = 0 ; i < data.length ; i ++){
        if(!data[i]){
            return false;
        }
    }
    return true;
}


module.exports.checkForNull = async(...data)=>{
    let result = false;
    await Promise.all([
        result = checkNullData(data)
    ]);
    console.log(result);
    return result;
}