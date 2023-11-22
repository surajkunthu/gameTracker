import getSteamGridURL from "./utils/getSteamGrid.js"

type Games = {
  name: string;
  imgURL: string;
  score: number;
  platform: string;
};

// import cors from "cors";
const addGame = document.getElementById("addGame") as HTMLElement;
const searchGame = document.getElementById("searchGame") as HTMLElement;
const searchSection = document.getElementById(
  "searchSection"
) as HTMLSpanElement;
const addSection = document.getElementById("addSection") as HTMLElement;
const statusSection = document.getElementById("status") as HTMLElement;
const gamesSection = document.getElementById("gamesSection") as HTMLElement;
const gameForm = document.getElementById("gameAddition") as HTMLFormElement;

// Click the `add a new game` button
addGame.addEventListener("click", async (e) => {
  e.preventDefault();
  // statusSection.textContent = "Game Added"
  addSection.hidden = false;
  searchSection.hidden = true;
});

// click `add` after inputting data
gameForm.addEventListener("submit", (e: Event) => {
  e.preventDefault();
  const newForm: FormData = new FormData(gameForm);
  const newFormData: any = Object.fromEntries(newForm);
  console.log(newFormData["gameName"]);
  const gameURL = getSteamGridURL(newFormData["gameName"]);
  // console.log(gameURL);
  // addNewGame(newFormData);
});

searchGame.addEventListener("click", (e: Event) => {
  e.preventDefault();
  addSection.hidden = true;
  searchSection.hidden = false;
});

gamesSection.addEventListener("click", (e: Event) => {
  const clickedElem = (e.target as HTMLElement).closest("span");
  if (clickedElem?.textContent !== undefined) {
    console.log(clickedElem?.textContent);
  }
});

const url = "http://localhost:3000/games";

async function getGames(): Promise<any> {
  try {
    const response: Response = await fetch(url, {
      mode: "cors",
      method: "GET",
    });
    const gameObjects: any[] = await response.json();

    let game: any;
    for (game of gameObjects) {
      const gameSpan = document.createElement("span");
      const gameImg = document.createElement("img");

      gameSpan.textContent = game.name;
      gameImg.src = game.imgURL;

      gameSpan.append(gameImg);
      gamesSection.append(gameSpan);
    }
  } catch (err) {
    console.error(err);
  }
}

async function addNewGame(newFormData: Object) {
  try {
    const options: object = {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFormData),
    };
    // const response = await fetch(url, options);
    console.log(newFormData);
    // if (!response.ok) {
    //   throw new Error();
    // }
    // return response;
  } catch (err) {
    console.error(err);
  }
}

window.addEventListener("load", () => {
  getGames();
});

//hard coded games
// const gameObject1 = {
//   name: "Age of Empires",
//   imgURL:
//     "https://cdn2.steamgriddb.com/file/sgdb-cdn/grid/0434b8e10f76266a9c4add79c62e1f64.png",
// };

// const gameObject2 = {
//   name: "Age of Mythology",
//   imgURL:
//     "https://cdn2.steamgriddb.com/file/sgdb-cdn/grid/256134fdb202adab4fb952696d93b8af.jpg",
// };

// const gameObject3 = {
//   name: "BioShock",
//   imgURL:
//     "https://cdn2.steamgriddb.com/file/sgdb-cdn/grid/12f59e05c632bd17f2409172507d6407.png",
// };
// const gameObject4 = {
//   name: "BioShock 2",
//   imgURL:
//     "https://cdn2.steamgriddb.com/file/sgdb-cdn/grid/9e36a141b565afea98b4e4a44e75ded4.png",
// };
// const gameObjects = [gameObject1, gameObject2, gameObject3, gameObject4];
