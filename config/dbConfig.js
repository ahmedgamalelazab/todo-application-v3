const knex= require('knex');

const {Model} = require('objection');

const environment = process.env.NODE_ENV ?? 'development';

const knexConfig = require('../knexfile')[environment];


const knexConnection = knex.knex(knexConfig);

Model.knex(knexConnection);

module.exports = Model;