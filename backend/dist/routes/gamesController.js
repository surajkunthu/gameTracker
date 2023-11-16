// import SGDB from "steamgriddb";
// import dotenv, { DotenvConfigOptions, DotenvParseOutput } from "dotenv";
import express from "express";
import knex from "knex";
import knexExport from "../knexfile.js";
const config = knexExport.development;
const gamesRouter = express.Router();
gamesRouter.get("/", async (req, res) => {
    try {
        const response = await knex(config)("games");
        res.status(200).json(response);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
gamesRouter.post("/", async (req, res) => {
    try {
        const response = await knex(config)("games")
            .insert({
            name: req.body.name,
            imgURL: req.body.imgURL,
            score: req.body.score,
            platform: req.body.platform,
        })
            .returning("*");
        res.status(200).json(response);
    }
    catch (err) {
        res.status(400).json({ message: "Error in post" + err });
    }
});
gamesRouter.delete("/:id", async (req, res) => {
    try {
        const response = await knex(config)("games")
            .del()
            .where("id", req.params.id);
        res
            .status(200)
            .json({ message: `Deleted game with id: ${req.params.id}` });
    }
    catch (err) {
        res.status(400).json({ message: "Error in post" + err });
    }
});
// const API_KEY: DotenvParseOutput | undefined = dotenv.config().parsed;
// // SteamGridDB API Connect
// const steamGridURL = "https://www.steamgriddb.com/api/v2";
// const client = new SGDB({
//   key: API_KEY?.api_key,
//   baseURL: steamGridURL,
// });
// // Find GAME ID
// const games = await client.searchGame("Age of Mythology");
// // GET GRID
// // 2254 = Game ID we got from searchGame()
// const grids = await client.getGrids({ type: "game", id: games[0].id });
// console.log(games[0]);
// console.log(grids[0].url);
export default gamesRouter;
