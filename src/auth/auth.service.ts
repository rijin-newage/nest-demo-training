import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async withToken(user: User) {
    return {
      user,
      token: await this.jwtService.signAsync(user),
    };
  }
}
