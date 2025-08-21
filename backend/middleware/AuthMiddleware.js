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

  try {
    const verifyToken = verify(accessToken, "Hello123!");
    req.user = verifyToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token!" });
  }
}

module.exports = validateTokenMiddleware;
