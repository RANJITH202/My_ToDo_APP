const constants = require("../Helper/constants");

const errorhandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation Error",
        message: err.message,
        stackTrace: err.stack,
        // stack: process.env.NODE_ENV === "production" ? null : err.stack,
      });
      break;
      case constants.UNAUTHORIZED:
        res.json({
          title: "Authorization Error",
          message: err.message,
          stackTrace: err.stack,
          // stack: process.env.NODE_ENV === "production" ? null : err.stack,
        });
        break;
        case constants.FORBIDDEN:
      res.json({
        title: "Forbidden Error",
        message: err.message,
        stackTrace: err.stack,
        // stack: process.env.NODE_ENV === "production" ? null : err.stack,
      });
      break;
      case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
        // stack: process.env.NODE_ENV === "production" ? null : err.stack,
      });
      break;
      case constants.SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: err.message,
        stackTrace: err.stack,
        // stack: process.env.NODE_ENV === "production" ? null : err.stack,
      });
      break;
    default:
      console.log("No error found. ALL GOOD!");
      break;
  }
}

module.exports = errorhandler;