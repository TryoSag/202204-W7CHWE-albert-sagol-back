const { notFoundError, generalError } = require("./errors");

describe("Given the notFoundError function", () => {
  describe("When it's called", () => {
    test("Then it should call the respose with status 404 and json with error and message 'Endpoint not found'", () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const expectedStatus = 404;
      const expectedError = { message: "Endpoint not found" };

      notFoundError(null, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given the generalError function", () => {
  describe("When it's called and receives an error with status 401 and message 'Unathorized'", () => {
    test("Then it should call the response with status 401 and json with error and message 'Unathorized'", () => {
      const expectedStatus = 404;
      const expectedError = { message: "Unathorized" };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const error = {
        statusCode: 404,
        message: "Unathorized",
      };

      generalError(error, null, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it's called and receives an error without status and message", () => {
    test("Then it should call the response with status 500 and json with error and message 'General error'", () => {
      const expectedStatus = 500;
      const expectedError = { message: "General error" };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const error = {
        statusCode: undefined,
        message: undefined,
      };

      generalError(error, null, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedError);
    });
  });
});
