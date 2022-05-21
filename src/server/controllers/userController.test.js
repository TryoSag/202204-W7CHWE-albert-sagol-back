const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../database/model/User");
const { loginUser } = require("./userController");

describe("Given the loginUser function", () => {
  describe("When it's called and receives a request with correct name and correct password", () => {
    test("Then it should call the response with status 200 and json with token", async () => {
      const req = {
        body: { name: "correctName", password: "correctPassword" },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const user = { name: "test", id: "test", username: "test" };
      User.findOne = jest.fn().mockReturnValue(user);

      const password = "123";
      bcrypt.compare = jest.fn().mockReturnValue(password);

      const token = "testToken";
      jwt.sign = jest.fn().mockReturnValue(token);

      const expectedStatus = 200;

      await loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith({ token });
    });
  });

  describe("When it's called and receives a request with wrong name", () => {
    test("Then t should call next with error with status code 403 and message 'Incorrect username or password'", async () => {
      const req = { body: { name: "wrongName" } };
      const next = jest.fn();

      User.findOne = jest.fn().mockReturnValue(undefined);

      const expectedError = new Error("Incorrect username or password");
      expectedError.statusCode = 403;

      await loginUser(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it's called and receives a request with wrong password", () => {
    test("Then t should call next with error with status code 403 and message 'Incorrect username or password'", async () => {
      const req = { body: { name: "correctName", password: "wrongPassword" } };
      const next = jest.fn();

      const user = { name: "test", id: "test", username: "test" };
      User.findOne = jest.fn().mockReturnValue(user);

      bcrypt.compare = jest.fn().mockReturnValue(undefined);

      const expectedError = new Error("Incorrect username or password");
      expectedError.statusCode = 403;

      await loginUser(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
