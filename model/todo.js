const Model = require('../config/dbConfig');

const {TableNames} = require('../src/tableNames/tableNames');

class Todo extends Model{
    static get tableName(){
        return TableNames.todo;
    }

    static get relationMappings(){
        const User = require('./user');

        return {
            user:{
                relation:Model.BelongsToOneRelation,
                modelClass:User,
                join:{
                    from:`${TableNames.todo}.user_id`,
                    to:`${TableNames.user}.id`
                }
            }
        }
    }
}


module.exports = Todo;