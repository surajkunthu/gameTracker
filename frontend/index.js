// import cors from "cors";
const addGame = document.getElementById("addGame");
const searchGame = document.getElementById("searchGame");
const searchSection = document.getElementById("searchSection");
const addSection = document.getElementById("addSection");
const statusSection = document.getElementById("status");
const gamesSection = document.getElementById("gamesSection");

const gameForm = document.getElementById("gameAddition");
const addGameName = document.getElementById("gameName").textContent;
const addGameScore = document.getElementById("gameScore").value;
const addGamePlatform = document.getElementById("gamePlatform").textContent;
const addButton = document.getElementById("add");

// Click the `add a new game` button
addGame.addEventListener("click", async (e) => {
  e.preventDefault();
  // statusSection.textContent = "Game Added"
  addSection.hidden = false;
  searchSection.hidden = true;
});

// click `add` after inputting data
gameForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(addGameName);
  const newForm = new FormData(gameForm);
  const newFormData = Object.fromEntries(newForm);
  console.log(newFormData);
  addNewGame(newFormData);
});

searchGame.addEventListener("click", (e) => {
  e.preventDefault();
  addSection.hidden = true;
  searchSection.hidden = false;
});

gamesSection.addEventListener("click", (e, element) => {
  const clickedElem = e.target;
  console.log(clickedElem.closest("span").textContent);
});

const url = "http://localhost:3000/games";

async function getGames() {
  try {
    const response = await fetch(url, { mode: "cors", method: "GET" });
    const gameObjects = await response.json();
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

// async function addNewGame(newFormData) {
//   try {
//     const options = {
//       method: "POST",
//       mode: "cors",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newFormData),
//     };
//     const response = await fetch(url, options);
//     console.log(response);
//     if (!response.ok) {
//       throw new Error();
//     }
//     return response;
//   } catch (err) {
//     console.error(err);
//   }
//  = await fetch(url)
//   .then(async (res) => {
//     if (res.ok) {
//       return await res.json().then(async () => {
//         console.log(res.message);
//       });
//     } else {
//       return res.json().then(() => {
//         throw new Error(console.error(res.message));
//       });
//     }
//   })
//   .catch((err) => {
//     return console.error(err);
// };

// const gameObjects = await response.json();
// }

getGames();

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

// Helper unction to connect to Steam Grid DB API and pull game grid URL
