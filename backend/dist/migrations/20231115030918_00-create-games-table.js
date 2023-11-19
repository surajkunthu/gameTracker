/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
    await knex.schema.createTable("games", function (table) {
        table.increments();
        table.string("name");
        table.string("imgURL");
        table.integer("score");
        table.string("platform");
    });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
    await knex.schema.dropTable("games");
};
