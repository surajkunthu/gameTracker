import knex, { Knex } from "knex";
import knexExport from "../knexfile.js";
const config: Knex.Config = knexExport.development;

import SGDB, { SGDBGame, SGDBImage } from "steamgriddb";
import dotenv, { DotenvParseOutput } from "dotenv";

// Middleware function to check if gameID exists
async function checkID(gameID: string) {
  const response: Promise<any>[] = await knex(config)("games").where(
    "id",
    gameID
  );
  if (response.length != 0) {
    return true;
  } else {
    return false;
  }
}

// Middleware function to check if gameName exists
async function checkGameName(gameName: string) {
  const response: Promise<any>[] = await knex(config)("games").where(
    "name",
    gameName
  );
  if (response.length != 0) {
    return true;
  } else {
    return false;
  }
}

// Middleware function to connect to Steam Grid DB API and pull game grid URL
async function getSteamGridURL(gameName: string): Promise<URL> {
  const API_KEY: DotenvParseOutput | undefined = dotenv.config().parsed;
  // SteamGridDB API Connect
  const steamGridURL: string = "https://www.steamgriddb.com/api/v2";
  const client: SGDB = new SGDB({
    key: API_KEY?.api_key,
    baseURL: steamGridURL,
  });
  // Find GAME ID
  const games: SGDBGame[] = await client.searchGame(gameName);

  // GET GRID
  // 2254 = Game ID we got from searchGame()
  const grids: SGDBImage[] = await client.getGrids({
    type: "game",
    id: games[0].id,
  });
  // console.log(games[0]);
  const gameGridURL: URL = grids[0].url;
  return gameGridURL;
}

export { checkID, checkGameName, getSteamGridURL };
