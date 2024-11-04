const { errorMsg, errorName } = require("../utils");

exports.errorHandling = (err, req, res, next) => {
  if (err?.name === errorName.BAD_REQUEST) {
    res.status(400).json({
      message: err?.message ?? "bad request",
    });
    return;
  }

  if (err?.name === errorName.NOT_FOUND) {
    res.status(404).json({
      message: err?.message ?? "not found",
    });
    return;
  }
  console.log(err);
  res.status(500).json({
    error: "Internal Server Error",
    message: "An unexpected Error from server",
  });
};
