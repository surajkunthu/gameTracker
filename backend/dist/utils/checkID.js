import knex from "knex";
import knexExport from "../knexfile.js";
const config = knexExport.development;
// Middleware function to check if gameID exists
async function checkID(gameID) {
    const response = await knex(config)("games").where("id", gameID);
    if (response.length != 0) {
        return true;
    }
    else {
        return false;
    }
}
// Middleware function to check if gameName exists
async function checkGameName(gameName) {
    const response = await knex(config)("games").where("name", gameName);
    if (response.length != 0) {
        return true;
    }
    else {
        return false;
    }
}
export { checkID, checkGameName };
