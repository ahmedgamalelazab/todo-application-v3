const registerRouter = require('express').Router();

const {register} = require('../controller/register');


registerRouter.route('/v1/user/register').post(register);


module.exports = registerRouter;