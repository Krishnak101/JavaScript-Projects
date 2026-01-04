import jwt from "jsonwebtoken";
import config from "config";

export default function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");
  // Check if no token
  if (!token) {
    return res
      .status(401)
      .json({ msg: "Authorization denied as token is missing" });
  }
  // Verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user_id = decoded.user_id;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid", error: err.message });
  }
}
