const express = require('express');

const helmet = require('helmet');

const morgan = require('morgan');

const  app = express();

app.use(helmet());

app.use(morgan('common'));

app.use(express.json()); // to send data in json format --> parsing incoming data


//section of routes 

const ApplicationRouting = require('./routesListener');

const Application = new ApplicationRouting(app);

Application.testingPage();

Application.userRegister();

Application.userLogin();

Application.createTodo();

//end of routes section 

module.exports = app;



