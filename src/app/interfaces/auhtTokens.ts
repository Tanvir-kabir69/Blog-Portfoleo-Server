export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export enum AuthToken {
  ACCESS = "accessToken",
  REFRESH = "refreshToken",
}
