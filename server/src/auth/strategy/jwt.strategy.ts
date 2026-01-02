import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { UserPayload } from "src/auth/interfaces/user-payload.interface";
import { AuthConfig } from "src/config/app.config";
import { JwtPayload } from "../interfaces/jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      // 1. Tell Passport how to extract the JWT from the request (usually from the header)
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 2. Secret key used to sign the JWT (SHOULD be stored in environment variables)
      secretOrKey: configService.get<AuthConfig>("auth")!.secret!,
      // 3. Prevent token expiration check if you handle it elsewhere (usually set to false)
      ignoreExpiration: false,
    });
  }

  /**
   * Called after the token is validated.
   * This method extracts the payload and attaches it to the request object (req.user).
   * @param payload The decoded, validated JWT payload.
   * @returns A partial user object to be stored in req.user.
   */
  validate(payload: JwtPayload): UserPayload {
    // IMPORTANT: Only return the data you want accessible via req.user
    return {
      id: payload.sub, // 'sub' is the standard field for the subject (usually the user ID)
      email: payload.email,
    };
  }
}
