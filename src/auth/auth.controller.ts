import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Public } from 'src/decorators/public.decorator';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { LocalAuthGuard } from './strategy/local-auth.guard';

export interface RequestWithUser extends Request {
  user: User;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @Public()
  @UseGuards(LocalAuthGuard)
  async authenticate(@Req() request: RequestWithUser, @Body() auth: AuthDto) {
    return this.authService.withToken(request.user);
  }
}
