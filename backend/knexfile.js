// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const knexExport = {
  development: {
    client: "pg",
    connection: {
      database: "games_db",
    },
  },
};

export default knexExport;
