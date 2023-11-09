const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("./models/users.model");

const verifyToken = promisify(jwt.verify);

exports.authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: "Unauthorized - Token not provided" });
  try {
    const decoded = await verifyToken(token, process.env.JWT_KEY);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(401).json({ error: "Unauthorized - User not found" });
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
};
