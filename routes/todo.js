const todoRouter = require('express').Router();

const {authMiddleware} = require('../middleware/auth');


const {createTodo, getTodo , updateTodo , deleteOneTodo , deleteAllRecords} = require('../controller/todo');

todoRouter.route('/v1/user/todo/create').post(authMiddleware , createTodo);

todoRouter.route('/v1/user/todo/getAll').get(authMiddleware , getTodo);

todoRouter.route('/v1/user/todo/update/:id').patch(authMiddleware , updateTodo);

todoRouter.route('/v1/user/todo/delete/:id').delete(authMiddleware , deleteOneTodo);

todoRouter.route('/v1/user/todo/delete').delete(authMiddleware , deleteAllRecords);


module.exports = todoRouter;