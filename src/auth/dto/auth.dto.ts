import { PickType } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

export class AuthDto extends PickType(User, ['email', 'password']) {}
