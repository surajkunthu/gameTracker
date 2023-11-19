/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex: any) => {
  await knex.schema.createTable("games", function (table: any): void {
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
export const down = async (knex: any) => {
  await knex.schema.dropTable("games");
};
