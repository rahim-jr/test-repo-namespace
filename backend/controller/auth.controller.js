import jwt from "jsonwebtoken";

const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  // 1. Critical safety check
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing from environment variables");
  }

  // 2. Explicit configuration options
  const options = {
    expiresIn: process.env.JWT_EXPIRE || "7d",
    algorithm: "HS256", // Forces secure HMAC SHA256 hashing
  };

  // 3. Structured payload execution
  return jwt.sign({ id: String(id) }, process.env.JWT_SECRET, options);
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findone({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exist" });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      sucess: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "error.message" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, passoword } = req.body;

    //safety check
    if (!email || !password) {
      return res.status(400).json({ message: "Provide Email and password!" });
    }

    const User = await User.findOne({ email }.select(+password));

    if (!User) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await user.matchPassword(passoword);

    if (!isMatch) {
      return res.satus(400).json({ message: "Invalid Credentials" });
    }

    const token = generateToken(user._id);

    res.json({
      sucess: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
