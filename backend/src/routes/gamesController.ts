import express, { Request, Response, Router } from "express";
import knex, { Knex } from "knex";
import knexExport from "../knexfile.js";

const config: Knex.Config = knexExport.development;
const gamesRouter: Router = express.Router();

import {
  checkID,
  checkGameName,
  getSteamGridURL,
} from "../utils/middleware.js";

gamesRouter.get("/", async (req: Request, res: Response) => {
  try {
    const response = (await knex(config)("games").orderBy("name"));
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
});

gamesRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const gameID: string = req.params.id;
    const check: boolean = await checkID(gameID);
    if (check) {
      const response = await knex(config)("games").where("id", gameID);
      res.status(200).json(response);
    } else {
      res
        .status(400)
        .json({ message: `Game with id: ${gameID} does not exist.` });
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error" + err });
  }
});

gamesRouter.post("/", async (req: Request, res: Response) => {
  try {
    const gameName: string = req.body.name;
    const check: boolean = await checkGameName(gameName);
    if (check) {
      res
        .status(400)
        .json({ message: `${gameName} already exists in the database` });
    } else {
      const getURL: URL = await getSteamGridURL(gameName);
      const response: Promise<any>[] = await knex(config)("games")
        .insert({
          name: req.body.name,
          imgURL: getURL,
          score: req.body.score,
          platform: req.body.platform,
        })
        .returning("*");
      res.status(200).json(response);
    }
  } catch (err) {
    res.status(400).json({ message: "Server Error" + err });
  }
});

gamesRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const gameID: string = req.params.id;
    const check: boolean = await checkID(gameID);
    if (check) {
      const response = await knex(config)("games")
        .update({
          name: req.body.name,
          imgURL: await getSteamGridURL(req.body.name),
          score: req.body.score,
          platform: req.body.platform,
        })
        .where("id", req.params.id);
      res
        .status(200)
        .json({ message: `Updated game with id: ${req.params.id}` });
    } else {
      res
        .status(400)
        .json({ message: `Game with id: ${gameID} does not exist.` });
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error" + err });
  }
});

gamesRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const gameID: string = req.params.id;
    const check: boolean = await checkID(gameID);
    if (check) {
      const response = await knex(config)("games")
        .del()
        .where("id", req.params.id);
      res
        .status(200)
        .json({ message: `Deleted game with id: ${req.params.id}` });
    } else {
      res
        .status(400)
        .json({ message: `Game with id: ${gameID} does not exist.` });
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error" + err });
  }
});

export default gamesRouter;
