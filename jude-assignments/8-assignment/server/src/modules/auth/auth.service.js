import jwt from "jsonwebtoken";
import User from "../users/user.model.js";
import Session from "../../models/session.model.js";

import ApiError from "../../utils/ApiError.js";

import {
  generateAccessToken,
  generateRefreshToken,
  hashToken
} from "../../utils/token.js";

// Create a new user.
export const signup = async (data) => {
  const existingUser = await User.findOne({
    email: data.email
  });

  if (existingUser) {
    throw new ApiError(409, "Email already registered");
  }

  const user = await User.create({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password
  });

  return createUserSession(user);
};

// Authenticate an existing user.
export const signin = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, "Invalid email or password");
  }

  if (!user.isActive) {
    throw new ApiError(403, "Your account is inactive");
  }

  return createUserSession(user);
};

// Generate tokens and save refresh session.
const createUserSession = async (user) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  const decoded = jwt.decode(refreshToken);

  await Session.create({
    user: user._id,
    refreshTokenHash: hashToken(refreshToken),
    expiresAt: new Date(decoded.exp * 1000)
  });

  return {
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    },
    accessToken,
    refreshToken
  };
};

// Rotate refresh token.
export const refreshSession = async (refreshToken) => {
  if (!refreshToken) {
    throw new ApiError(401, "Refresh token required");
  }

  let decoded;

  try {
    decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
  } catch {
    throw new ApiError(401, "Invalid or expired refresh token");
  }

  if (decoded.type !== "refresh") {
    throw new ApiError(401, "Invalid token type");
  }

  const session = await Session.findOne({
    user: decoded.sub,
    refreshTokenHash: hashToken(refreshToken)
  });

  if (!session) {
    throw new ApiError(401, "Session expired or revoked");
  }

  const user = await User.findById(decoded.sub);

  if (!user || !user.isActive) {
    await Session.deleteOne({ _id: session._id });
    throw new ApiError(401, "Account unavailable");
  }

  const newAccessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user);
  const newDecoded = jwt.decode(newRefreshToken);

  // Rotate the stored refresh token.
  session.refreshTokenHash = hashToken(newRefreshToken);
  session.expiresAt = new Date(newDecoded.exp * 1000);

  await session.save();

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken
  };
};

// Revoke the current session.
export const logout = async (refreshToken) => {
  if (!refreshToken) return;

  await Session.deleteOne({
    refreshTokenHash: hashToken(refreshToken)
  });
};