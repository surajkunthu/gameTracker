// import SGDB from "steamgriddb";
// import dotenv, { DotenvConfigOptions, DotenvParseOutput } from "dotenv";
import express from "express";
import gamesController from "./routes/gamesController.js";
import cors from "cors";
const app = express();
const PORT = 3000;
// const API_KEY: DotenvParseOutput | undefined = dotenv.config().parsed;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/games", gamesController);

app.get("/", (req, res) => {
  try {
    res.status(200).json("This is the gameTracker application!");
  } catch (err) {
    res.status(404).json(err);
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

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
