import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import {
  BeforeSave,
  Column,
  DefaultScope,
  Model,
  Table,
} from 'sequelize-typescript';
import { hashPassword } from 'src/utils';
import { Role } from '../role.enum';

@DefaultScope(() => ({
  attributes: { exclude: ['password'] },
}))
@Table({
  paranoid: true,
})
export class User extends Model {
  @ApiProperty({
    description: 'ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Name',
    example: 'Admin',
  })
  @IsString()
  @Column
  name: string;

  @ApiProperty({
    description: 'Email',
    example: 'admin@mailinator.com',
    format: 'email',
  })
  @IsString()
  @IsEmail()
  @Column({ unique: 'email' })
  email: string;

  @ApiProperty({
    description: 'Password',
    example: '123456',
  })
  @IsString()
  @Column
  password: string;

  @ApiProperty({
    description: 'Role',
    example: Role.User,
    enum: Role,
  })
  @IsString()
  @IsEnum(Role)
  @Column({ defaultValue: Role.User })
  role: Role;

  @BeforeSave
  static async doBeforeSave(instance: User) {
    if (instance.changed('password')) {
      instance.password = await hashPassword(instance.password);
    }
  }
}
