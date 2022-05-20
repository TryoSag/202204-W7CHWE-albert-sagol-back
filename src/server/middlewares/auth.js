const chalk = require("chalk");
const debug = require("debug")("socialnet:users");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authorization = req.headers.Authorization;
  if (!authorization) {
    const error = new Error("Token missing");
    debug(chalk.red("Token missing"));
    error.statusCode = 401;

    next(error);
  } else {
    const token = authorization.replace("Bearer ", "");

    try {
      const { id } = jwt.verify(token, process.env.JWT_SECRET);

      req.userId = id;
      next();
    } catch {
      const error = new Error("Wrong token");
      debug(chalk.red("Wrong token"));
      error.statusCode = 401;

      next(error);
    }
  }
};

module.exports = auth;
