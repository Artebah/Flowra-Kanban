import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, Profile, StrategyOptions } from "passport-google-oauth20";
import { ConfigService } from "@nestjs/config";
import { GoogleUserPayload } from "../interfaces/google-payload.interface";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(private configService: ConfigService) {
    const options: StrategyOptions = {
      clientID: configService.getOrThrow<string>("GOOGLE_CLIENT_ID"),
      clientSecret: configService.getOrThrow<string>("GOOGLE_CLIENT_SECRET"),
      callbackURL: configService.getOrThrow<string>("GOOGLE_CALLBACK_URL"),
      scope: ["email", "profile"],
    };

    super(options);
  }

  validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ): GoogleUserPayload {
    return {
      googleId: profile.id,
      email: profile.emails?.[0]?.value ?? "",
      avatar: profile.photos?.[0]?.value ?? "",
    };
  }
}
