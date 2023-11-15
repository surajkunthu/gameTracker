/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  knex.schema.createTable("games", function (table) {
    table.increments();
    table.string("name");
    table.string("imgURL");
    table.integer("score");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    knex.schema.dropTable('games')
};

export default exports