const User = require("../model/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
require("dotenv").config();

// const register = async (req, res) => {
//   const user = await User.create({ ...req.body });

//   const token = user.createJWT();
//   res
//     .status(StatusCodes.CREATED)
//     .json({ user: { name: user.username }, token });
// };

const register = async (req, res) => {
  try {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res
      .status(StatusCodes.CREATED)
      .json({ user: { name: user.username }, token });
  } catch (error) {
    console.error("❌ Register Error:", error);

    // Handle duplicate username/email (Mongo error code 11000)
    if (error.code === 11000) {
      return res.status(StatusCodes.CONFLICT).json({
        msg: "Username or email already taken",
      });
    }

    // Handle validation errors
    if (error.name === "ValidationError") {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: Object.values(error.errors)
          .map((val) => val.message)
          .join(", "),
      });
    }

    // All other errors
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Server Error" });
  }
};

const login = async (req, res) => {
  const { password, username } = req.body;

  if (!username || !password) {
    throw new BadRequestError("please provide username and password");
  }

  const user = await User.findOne({ username });

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const token = user.createJWT();

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 60 * 60 * 1000, // 1 hour
    })
    .status(StatusCodes.OK)
    .json({ user: { username: user.username } });
};

const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = {
  login,
  register,
  logout,
};
