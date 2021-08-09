class ApplicationRouting{

    constructor(application){
        this.applicationRouting = application;
    }

    testingPage(){
        this.applicationRouting.use('/',require('../../routes/welcomePage'));
    }
    userRegister(){
        this.applicationRouting.use('/todoApp',require('../../routes/register'));
    }
    userLogin(){
        this.applicationRouting.use('/todoApp',require('../../routes/login'));
    }
    createTodo(){
        this.applicationRouting.use('/todoApp',require('../../routes/todo'));
    }
}

module.exports = ApplicationRouting;
