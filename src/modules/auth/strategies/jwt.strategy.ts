import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import * as APP_CONFIG from '@app/app.config';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: APP_CONFIG.AUTH.jwtTokenSecret,
    });
  }

  /*  async validate(payload: JwtPayload): Promise<User> {
    const { username, id } = payload;

    const user = await this.authService.validateUser();
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  } */
  async validate(payload: any) {
    const { iat, exp, sub, ...user } = payload;

    console.log(user);

    return user;
  }
}
