const knexExport = {
    development: {
        client: "pg",
        connection: {
            database: "games_db",
        },
    },
};
export default knexExport;
