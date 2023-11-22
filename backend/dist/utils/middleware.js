import knex from "knex";
import knexExport from "../knexfile.js";
const config = knexExport.development;
import SGDB from "steamgriddb";
import dotenv from "dotenv";
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
export { checkID, checkGameName, getSteamGridURL };
