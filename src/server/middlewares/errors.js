const chalk = require("chalk");
const debug = require("debug")("socialnet:server:middlewares:errors");

const notFoundError = (req, res) => {
  res.status(404).json({ error: true, message: "Endpoint not found" });
};

// eslint-disable-next-line no-unused-vars
const generalError = (error, req, res, next) => {
  debug(chalk.red(`Error: ${error.message}`));
  const errorCode = error.statusCode ?? 500;
  const errorMessage = error.message ?? "General error";

  res.status(errorCode).json({ error: true, message: errorMessage });
};

module.exports = {
  notFoundError,
  generalError,
};
