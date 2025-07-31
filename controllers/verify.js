// route: GET /api/v1/auth/verify
const jwt = require("jsonwebtoken");

const verify = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res
      .status(200)
      .json({ user: { id: decoded.userId, username: decoded.username } });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verify;
