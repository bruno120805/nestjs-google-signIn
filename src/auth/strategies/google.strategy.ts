import { PassportStrategy } from '@nestjs/passport';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACKURL,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, name, emails, photos } = profile;
    const user = {
      provider: 'google',
      providerId: id,
      name: `${name.givenName} ${name.familyName}`,
      email: emails[0].value,
      picture: photos[0].value,
    };
    done(null, user);
  }
}
