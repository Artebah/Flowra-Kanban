import { registerAs } from "@nestjs/config";
import { AuthConfig } from "./app.config";

export const authConfig = registerAs(
  "auth",
  (): AuthConfig => ({
    secret: process.env.JWT_ACCESS_SECRET,
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  }),
);
