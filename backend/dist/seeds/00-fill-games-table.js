/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async (knex) => {
    // Deletes ALL existing entries
    await knex("games").del();
    await knex("games").insert([
        {
            name: "Age of Empires",
            imgURL: "https://cdn2.steamgriddb.com/file/sgdb-cdn/grid/0434b8e10f76266a9c4add79c62e1f64.png",
            score: 10,
            platform: "PC",
        },
        {
            name: "Age of Mythology",
            imgURL: "https://cdn2.steamgriddb.com/file/sgdb-cdn/grid/256134fdb202adab4fb952696d93b8af.jpg",
            score: 9,
            platform: "PC",
        },
        {
            name: "BioShock",
            imgURL: "https://cdn2.steamgriddb.com/file/sgdb-cdn/grid/12f59e05c632bd17f2409172507d6407.png",
            score: 10,
            platform: "PC",
        },
    ]);
};
