import { IsBoolean, IsEmail, IsInt, IsString } from 'class-validator';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class Person extends Model {
  @IsInt()
  id: number;

  @Column
  @IsString()
  name: string;

  @Column
  @IsString()
  @IsEmail()
  email: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  @IsBoolean()
  active: boolean;

  @Column(DataType.TEXT)
  @IsString()
  info: string;
}
