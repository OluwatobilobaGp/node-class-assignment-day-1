import jwt from "jsonwebtoken";
import User from "../src/modules/users/user.model.js";
import ApiError from "../src/utils/ApiError.js";
import asyncHandler from "../src/utils/asyncHandler.js";

const authenticate = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "Authentication required");
  }

  const token = authHeader.split(" ")[1];

  let decoded;

  try {
    decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );
  } catch {
    throw new ApiError(401, "Invalid or expired access token");
  }

  if (decoded.type !== "access") {
    throw new ApiError(401, "Invalid token type");
  }

  const user = await User.findById(decoded.sub);

  if (!user || !user.isActive) {
    throw new ApiError(401, "User not found or inactive");
  }

  req.user = user;

  next();
});

export default authenticate;