import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from 'src/user/user.service';
import { comparePassword } from 'src/utils';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(username: string, password: string) {
    const user = await this.userService.findByEmail(username);
    if (!user) throw new UnauthorizedException('User not found');
    if (!(await comparePassword(password, user.password)))
      throw new UnauthorizedException('Invalid password');
    const payload = user.toJSON();
    delete payload.password;
    return payload;
  }
}
