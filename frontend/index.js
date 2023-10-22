const addGame = document.getElementById("addGame");
const searchGame = document.getElementById("searchGame");
const searchSection = document.getElementById("searchSection");
const addSection = document.getElementById("addSection");
const statusSection = document.getElementById("status");


addGame.addEventListener("click",(e) => {
    e.preventDefault();
    // statusSection.textContent = "Game Added"
    addSection.hidden = false;
    searchSection.hidden = true;
    
} )

searchGame.addEventListener("click",(e) => {
    e.preventDefault();
    addSection.hidden = true;
    searchSection.hidden = false;
} )