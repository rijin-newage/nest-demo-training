import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Owner } from 'src/decorators/owner.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Role } from './role.enum';
import { UserService } from './user.service';

@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
@Roles(Role.Admin)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Created',
    type: User,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Ok',
    type: [User],
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get('me')
  @Roles(Role.User)
  @ApiOkResponse({
    description: 'Ok',
    type: User,
  })
  findMe(@Owner() user: User) {
    return this.userService.findOne(user.id);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Ok',
    type: User,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Patch('me')
  @ApiOkResponse({
    description: 'Updated',
    type: User,
  })
  @Roles(Role.User)
  updateMe(@Owner() user: User, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(user.id, updateUserDto);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Updated',
    type: User,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Deleted',
    type: User,
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
