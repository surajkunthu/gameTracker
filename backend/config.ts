// config.ts
import knexExport from "./knexfile.js";

const environment: string = process.env.NODE_ENV || "development";
const configuration = knexExport[environment];

export default configuration;
