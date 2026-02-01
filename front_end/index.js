import gamesObject from "../formatter/data.json" with { type: "json" };

let gamesSection = document.getElementById("gamesSection");
let numGameSection = document.getElementById("gameNumber");

// console.log(typeof(gamesObject))

gamesSection.addEventListener("click", (e) => {
  const clickedElem = (e.target).closest("span");
  if (clickedElem?.innerHTML !== undefined) {
    console.log(clickedElem?.ariaValueText);
  }
});

// gamesObject.sort((a, b) => b.title - a.title); 
gamesObject.sort((a, b) => a.title.localeCompare(b.title)); // || a.year - b.year);
numGameSection.innerHTML = "&nbsp" + gamesObject.length;


for (let game of gamesObject) {
  const gameSpan = document.createElement("span");
  const gameImg = document.createElement("img");

  // gameSpan.textContent = game.title;
  gameSpan.ariaValueText = game.title;
  gameImg.src = game.imgURL;

  gameSpan.append(gameImg);
  gamesSection.append(gameSpan);
}

