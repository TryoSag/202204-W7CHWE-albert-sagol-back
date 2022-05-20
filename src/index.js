require("dotenv").config();
const debug = require("debug")("series:root");
const chalk = require("chalk");
const connectDataBase = require("./database/index");
const app = require("./server/index");
const { initializeServer } = require("./serverInitializer");

const port = process.env.PORT || 4000;
const dbUrl = process.env.MONGODB_STRING;

(async () => {
  try {
    await connectDataBase(dbUrl);
    await initializeServer(port, app);
  } catch (error) {
    debug(chalk.red(`General error:`, error.message));
  }
})();
