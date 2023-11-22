import SGDB, { SGDBGame, SGDBImage } from "steamgriddb";
import dotenv, { DotenvParseOutput } from "dotenv";

// Middleware function to connect to Steam Grid DB API and pull game grid URL
async function getSteamGridURL(gameName: string): Promise<URL> {
    const API_KEY: DotenvParseOutput | undefined = dotenv.config().parsed;
    // SteamGridDB API Connect
    const steamGridURL: string = "https://www.steamgriddb.com/api/v2";
    const client: SGDB = new SGDB({
      key: API_KEY?.api_key, // hard code API key for now
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


// console.log(await getSteamGridURL("Assassin's Creed 2"))
export default getSteamGridURL 