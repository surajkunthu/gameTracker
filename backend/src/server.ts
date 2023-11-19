import express, { Application, Request, Response, Router } from "express";
import gamesController from "./routes/gamesController.js";
import cors from "cors";
const app: Application = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/games", gamesController);

app.get("/", (req: Request, res: Response) => {
  try {
    res.status(200).json("This is the gameTracker application!");
  } catch (err) {
    res.status(404).json(err);
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
