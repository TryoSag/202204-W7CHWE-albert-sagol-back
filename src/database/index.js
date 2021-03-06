const debug = require("debug")("socialnet:database");
const chalk = require("chalk");
const mongoose = require("mongoose");

const connectDB = (connectionString) =>
  new Promise((resolve, reject) => {
    mongoose.connect(connectionString, (error) => {
      if (error) {
        reject(error);
        return;
      }
      debug(chalk.bgMagenta.greenBright(`Database connected`));

      resolve();
    });
  });

module.exports = connectDB;
