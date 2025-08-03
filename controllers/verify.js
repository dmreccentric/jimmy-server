// route: GET /api/v1/auth/verify
const jwt = require("jsonwebtoken");

const verify = async (req, res) => {
  const token = req.cookies.token;
  console.log("🔒 Verify Route - Token:", token); // add this

  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token verified:", decoded);
    res
      .status(200)
      .json({ user: { id: decoded.userId, username: decoded.username } });
  } catch (err) {
    console.error("❌ Invalid token:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verify;
