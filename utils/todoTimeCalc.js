
// const {checkForNull} = require('./checkForNulls');


class TimeFutureCalculator{

     static FutureTime(time , duration){
        
        const userDate = Date.parse(time); // this for user date
        
        const originalUserDate = new Date(time); // original one which we won't apply any mathematics operations on it

        const realDate = new Date(userDate); // real date which we will operate mathematics on it

        const newDate = realDate.setHours(realDate.getHours()+parseInt(duration)); // new Date after applying the mathematics on it

        const realnewDate = new Date(newDate);

        return [originalUserDate , realnewDate];

    }


}

module.exports = TimeFutureCalculator;