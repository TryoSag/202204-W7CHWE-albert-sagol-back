const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const chalk = require("chalk");
const debug = require("debug")("socialnet:users");
const User = require("../../database/model/User");

const loginUser = async (req, res, next) => {
  const { name, password } = req.body;
  try {
    const user = await User.findOne({ name });

    if (!user) {
      const error = new Error("Incorrect username or password");
      error.statusCode = 403;
      debug(chalk.red("Wrong user data"));

      next(error);
    } else {
      const correctPassword = await bcrypt.compare(password, user.password);

      if (!correctPassword) {
        const error = new Error("Incorrect username or password");
        error.statusCode = 403;
        debug(chalk.red("Wrong password data"));

        next(error);
      } else {
        const userData = {
          name: user.name,
          id: user.id,
          usename: user.usename,
        };
        const token = jwt.sign(userData, process.env.JWT_SECRET);

        res.status(200).json({ token });
      }
    }
  } catch (error) {
    error.message("Request error");
    error.statusCode = 400;
    debug(chalk.red("Request error"));

    next(error);
  }
};

module.exports = { loginUser };
