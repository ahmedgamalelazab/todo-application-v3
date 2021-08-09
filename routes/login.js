const loginRouter = require('express').Router();

const {login} = require('../controller/login');



loginRouter.route('/v1/user/login').post(login);



module.exports = loginRouter;