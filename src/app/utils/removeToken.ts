import { Response } from "express";
import { AuthToken } from "../interfaces/auhtTokens";
import { envVars } from "../config/env";

const removeToken = (res: Response) => {
  const isProduction = envVars.NODE_ENV === "production";

  res.clearCookie(AuthToken.ACCESS, {
    httpOnly: true,
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
  });

  res.clearCookie(AuthToken.REFRESH, {
    httpOnly: true,
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
  });
};

export default removeToken;
