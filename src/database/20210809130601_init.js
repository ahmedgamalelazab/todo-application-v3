// const Knex = require("knex").knex();
const { TableNames } = require("../tableNames/tableNames");
/**
 *
 * @param {Knex} knex
 */

exports.up = async function up(knex) {
  await knex.schema.createTable(TableNames.user, (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("Fname", 50).notNullable();
    table.string("Lname", 50).notNullable();
    table.string("email").notNullable();
    table.string("password", 150).notNullable();
    //building tables and get the created at and deleted at
    table.timestamps(false, true);
    table.dateTime("deleted_at");
  });
  await knex.schema.createTable(TableNames.todo, (table) => {
    table.increments("id").primary();
    table.string("Aname").notNullable();
    table.string("Aduration").notNullable();
    table.dateTime("Astart").notNullable();
    table.dateTime("Afinish").notNullable();
    table.uuid("user_id").notNullable();
    table
      .foreign("user_id")
      .references("id")
      .inTable(TableNames.user)
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.timestamps(false, true);
    table.dateTime("deleted_at");
  });
};

exports.down = async function down(knex) {
  await Promise.all(
    [
      TableNames.todo, // this is the child one which getting deleted at first
      TableNames.user, // this is the the parent one which getting deleted last
    ].map((table_name) => knex.schema.dropTableIfExists(table_name))
  );
};
