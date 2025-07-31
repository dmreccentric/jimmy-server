const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const authenticateUser = async (req, res, next) => {
  const token = req.cookies.token;
  console.log("cookies:", req.cookies);

  if (!token) {
    console.log("❌ No token found in cookies");
    throw new UnauthenticatedError("Authentication Invalid");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { userId: payload.userId, username: payload.username };
    next();
  } catch (error) {
    console.log("❌ JWT verification failed:", error.message);
    throw new UnauthenticatedError("Authentication Invalid");
  }
};

module.exports = authenticateUser;
