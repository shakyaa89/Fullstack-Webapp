const { verify } = require("jsonwebtoken");

function validateTokenMiddleware(req, res, next) {
  const rawAccessToken = req.headers.authorization;

  if (!rawAccessToken) {
    return res.status(401).json({ message: "User is not authenticated! 1" });
  }

  const accessToken = req.headers.authorization.split(" ")[1];

  if (!accessToken || accessToken === "null") {
    return res.status(401).json({ message: "User is not authenticated! 2" });
  }

  const verifyToken = verify(accessToken, "Hello123!");

  if (verifyToken) {
    req.user = verifyToken;
    next();
  } else {
    return res.status(401).json({ message: "User is not authenticated!" });
  }
}

module.exports = validateTokenMiddleware;
