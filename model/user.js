const Model = require('../config/dbConfig');
const {TableNames} = require('../src/tableNames/tableNames');

class User extends Model{

    static get tableName(){
        return TableNames.user;
    }

    static get relationMappings(){
        const Todo = require('./todo');
        
        return {
            todo:{
                relation:Model.HasManyRelation,
                modelClass :Todo,
                join:{
                    from:`${TableNames.user}.id`,
                    to:`${TableNames.todo}.user_id`,
                }
            }
        }
    } 


}


module.exports = User;