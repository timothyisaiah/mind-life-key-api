import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";
import { AuthService } from "./auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(config: ConfigService, private readonly authService: AuthService) {
    super({
      clientID: config.get<string>("GOOGLE_CLIENT_ID", ""),
      clientSecret: config.get<string>("GOOGLE_CLIENT_SECRET", ""),
      callbackURL: config.get<string>("GOOGLE_CALLBACK_URL", ""),
      scope: ["profile", "email"]
    });
  }

  async validate(_: string, __: string, profile: Profile) {
    const email = profile.emails?.[0]?.value;
    if (!email) {
      return null;
    }
    const user = await this.authService.validateGoogleUser({
      id: profile.id,
      email
    });
    return { userId: user.id, email: user.email };
  }
}
