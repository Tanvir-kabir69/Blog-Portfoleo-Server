import { Response } from "express";
import { AuthTokens } from "../interfaces/auhtTokens";

export const setAuthCookie = (
  res: Response,
  tokenInfo: Partial<AuthTokens>
) => {
  if (tokenInfo.accessToken) {
    res.cookie("accessToken", tokenInfo.accessToken, {
      httpOnly: true,
      // secure: envVars.NODE_ENV === "production",
      secure: true,
      sameSite: "none",
    });
  }

  if (tokenInfo.refreshToken) {
    res.cookie("refreshToken", tokenInfo.refreshToken, {
      httpOnly: true,
      // secure: envVars.NODE_ENV === "production",
      secure: true,
      sameSite: "none",
    });
  }
};
