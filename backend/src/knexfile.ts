// Update with your config settings.
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
interface Knexfile {
  client: string;
  connection: {
    database: string;
  };
}

const knexExport: Record<string, Knexfile> = {
  development: {
    client: "pg",
    connection: {
      database: "games_db",
    },
  },
};

export default knexExport;
