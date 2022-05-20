const jwt = require("jsonwebtoken");
const auth = require("./auth");

describe("Given the auth function", () => {
  const next = jest.fn();

  describe("When it's called and it receives a request with a correct token", () => {
    test("Then it should call next without arguments", () => {
      const req = {
        headers: {
          Authorization: "Bearer ",
        },
      };
      const token = { id: 1 };
      jwt.verify = jest.fn().mockReturnValue(token);

      auth(req, null, next);

      expect(next).toHaveBeenCalledWith();
    });
  });

  describe("When it's called and it receives a request with wrong token", () => {
    test("Then it should call next with an error with the message 'Wrong token' and the statusCode 401", () => {
      const req = {
        headers: {
          Authorization: "Bearer ",
        },
      };
      const error = new Error("Wrong token");
      error.statusCode = 401;
      jwt.verify = jest.fn().mockReturnValue(null);

      auth(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When it's called and it receives a request without token", () => {
    test("Then it should call next with an error with the message 'Token missing' and the statusCode 401", () => {
      const req = {
        headers: {
          Authorization: undefined,
        },
      };
      const error = new Error("Token missing");
      error.statusCode = 401;

      auth(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
