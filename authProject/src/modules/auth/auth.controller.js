import * as authService from "./auth.service.js";
import asyncHandler from "../../utils/asyncHandler.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/api/v1/auth"
}


export const signup = asyncHandler(async (req, res) => {
  const result = await authService.signup(req.body);

  res.cookie(
    "refreshToken",
    result.refreshToken,
    {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000
    }
  );

  res.status(201).json({
    success: true,
    message: "Account created successfully",
    data: {
      user: result.user,
      accessToken: result.accessToken
    }
  });
});

export const signin = asyncHandler(async (req, res) => {
  const result = await authService.signin(
    req.body.email,
    req.body.password
  );

  res.cookie(
    "refreshToken",
    result.refreshToken,
    {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000
    }
  );

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      user: result.user,
      accessToken: result.accessToken
    }
  });
});

export const refresh = asyncHandler(async (req, res) => {
  const result = await authService.refreshSession(
    req.cookies.refreshToken
  );

  res.cookie(
    "refreshToken",
    result.refreshToken,
    {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000
    }
  );

  res.status(200).json({
    success: true,
    message: "Token refreshed",
    data: {
      accessToken: result.accessToken
    }
  });
});

export const logout = asyncHandler(async (req, res) => {
  await authService.logout(req.cookies.refreshToken);

  res.clearCookie("refreshToken", cookieOptions);

  res.status(200).json({
    success: true,
    message: "Logged out successfully"
  });
});

export const me = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      user: {
        id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        role: req.user.role,
        isEmailVerified: req.user.isEmailVerified
      }
    }
  });
});