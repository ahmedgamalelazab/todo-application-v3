
const welcomePageRouter =require('express').Router();

const {welcome} = require('../controller/welcomePage');


welcomePageRouter.route('/').get(welcome);


module.exports = welcomePageRouter;