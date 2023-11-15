import SGDB from "steamgriddb";
import dotenv from "dotenv";
import express from "express";
const app = express();
const PORT = 3000;
const API_KEY = dotenv.config().parsed.key;

app.use(express.json());

// SteamGridDB API Connect
const steamGridURL = "https://www.steamgriddb.com/api/v2";
const client = new SGDB({
  key: API_KEY,
  headers: {
    "X-Some-Header": "Some Value",
  },
  baseURL: steamGridURL,
});

// Find GAME ID
const games = await client.searchGame("Age of Mythology");

// GET GRID
// 2254 = Game ID we got from searchGame()
const grids = await client.getGrids({ type: "game", id: games[0].id });

// app.use(json);
// console.log(dotenv.config().parsed.key)
console.log(games[0]);

console.log(grids[0].url);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
