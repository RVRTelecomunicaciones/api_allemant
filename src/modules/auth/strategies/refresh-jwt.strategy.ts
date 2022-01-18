/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from 'nestjs-config';
import { AuthService } from '../auth.service';
import { Res } from '@nestjs/common';
const cookieExtractor = (request: Request): string | undefined => {
  return request.cookies['refreshToken'];
};
import * as APP_CONFIG from '@app/app.config';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    config: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      /*       jwtFromRequest: cookieExtractor,
       */ secretOrKey: APP_CONFIG.AUTH.jwtTokenSecret,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    // eslint-disable-next-line prefer-const
    let { iat, sub, exp, ...user } = payload;
    /* user = this.authService.validateRefreshToken({
      user: payload,
      refreshToken: req.cookies['refreshToken'],
    });

    if (!user) throw new UnauthorizedException();

    return user; */
    const refreshToken = req.get('authorization').replace('Bearer', '').trim();
    return {
      ...payload,
      refreshToken,
    };
  }
}
