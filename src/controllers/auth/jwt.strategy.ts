import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { UserService } from 'src/services/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService, private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get("SECRET"),
    });
  }

  async validate(userId: any, done: VerifiedCallback) {
    const user = await this.userService.findOneById(userId["id"]);
    if (!user) {
      return done(new UnauthorizedException(), false);
    }

    return done(null, { id: user.id }, userId.iat);
  }
}