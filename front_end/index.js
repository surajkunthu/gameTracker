import gamesObject from "../formatter/data.json" with { type: "json" };

let gamesSection = document.getElementById("gamesSection");

console.log(typeof(gamesObject))

// gamesObject.sort((a, b) => a.title - b.title); 

gamesSection.addEventListener("click", (e) => {
  const clickedElem = (e.target).closest("span");
  if (clickedElem?.innerHTML !== undefined) {
    console.log(clickedElem?.innerHTML);
  }
});

for (let game of gamesObject) {
  const gameSpan = document.createElement("span");
  const gameImg = document.createElement("img");

//   gameSpan.textContent = game.title;
//   gameSpan.innerHTML = game.title;
  gameImg.src = game.imgURL;

  gameSpan.append(gameImg);
  gamesSection.append(gameSpan);
}

