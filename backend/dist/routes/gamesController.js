import SGDB from "steamgriddb";
import dotenv from "dotenv";
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
gamesRouter.get("/:id", async (req, res) => {
    try {
        const gameID = req.params.id;
        const check = await checkID(gameID);
        if (check) {
            const response = await knex(config)("games").where("id", gameID);
            res.status(200).json(response);
        }
        else {
            res
                .status(400)
                .json({ message: `Game with id: ${gameID} does not exist.` });
        }
    }
    catch (err) {
        res.status(500).json({ message: "Server Error" + err });
    }
});
gamesRouter.post("/", async (req, res) => {
    try {
        const gameName = req.body.name;
        const check = await checkGameName(gameName);
        if (check) {
            res
                .status(400)
                .json({ message: `${gameName} already exists in the database` });
        }
        else {
            const getURL = await getSteamGridURL(gameName);
            const response = await knex(config)("games")
                .insert({
                name: req.body.name,
                imgURL: getURL,
                score: req.body.score,
                platform: req.body.platform,
            })
                .returning("*");
            res.status(200).json(response);
        }
    }
    catch (err) {
        res.status(400).json({ message: "Server Error" + err });
    }
});
gamesRouter.put("/:id", async (req, res) => {
    try {
        const gameID = req.params.id;
        const check = await checkID(gameID);
        if (check) {
            const response = await knex(config)("games")
                .update({
                name: req.body.name,
                score: req.body.score,
                platform: req.body.platform,
            })
                .where("id", req.params.id);
            res
                .status(200)
                .json({ message: `Deleted game with id: ${req.params.id}` });
        }
        else {
            res
                .status(400)
                .json({ message: `Game with id: ${gameID} does not exist.` });
        }
    }
    catch (err) {
        res.status(500).json({ message: "Server Error" + err });
    }
});
gamesRouter.delete("/:id", async (req, res) => {
    try {
        const gameID = req.params.id;
        const check = await checkID(gameID);
        if (check) {
            const response = await knex(config)("games")
                .del()
                .where("id", req.params.id);
            res
                .status(200)
                .json({ message: `Deleted game with id: ${req.params.id}` });
        }
        else {
            res
                .status(400)
                .json({ message: `Game with id: ${gameID} does not exist.` });
        }
    }
    catch (err) {
        res.status(500).json({ message: "Server Error" + err });
    }
});
// Middleware function to check if gameID exists
async function checkID(gameID) {
    const response = await knex(config)("games").where("id", gameID);
    if (response.length != 0) {
        return true;
    }
    else {
        return false;
    }
}
// Middleware function to check if gameName exists
async function checkGameName(gameName) {
    const response = await knex(config)("games").where("name", gameName);
    if (response.length != 0) {
        return true;
    }
    else {
        return false;
    }
}
// Middleware function to connect to Steam Grid DB API and pull game grid URL
async function getSteamGridURL(gameName) {
    const API_KEY = dotenv.config().parsed;
    // SteamGridDB API Connect
    const steamGridURL = "https://www.steamgriddb.com/api/v2";
    const client = new SGDB({
        key: API_KEY?.api_key,
        baseURL: steamGridURL,
    });
    // Find GAME ID
    const games = await client.searchGame(gameName);
    // GET GRID
    // 2254 = Game ID we got from searchGame()
    const grids = await client.getGrids({
        type: "game",
        id: games[0].id,
    });
    // console.log(games[0]);
    const gameGridURL = grids[0].url;
    return gameGridURL;
}
export default gamesRouter;
