import knexExport from "../knexfile.js";
const environment = process.env.NODE_ENV || "development";
const configuration = knexExport[environment];
export default configuration;
