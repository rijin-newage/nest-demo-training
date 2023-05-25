import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return this.userModel.create({ ...createUserDto });
  }

  async findAll() {
    return this.userModel.findAll();
  }

  async findOne(id: number) {
    return this.userModel.findByPk(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.userModel
      .findByPk(id)
      .then((user) => user.update({ ...updateUserDto }));
  }

  async remove(id: number) {
    return this.userModel.findByPk(id).then((user) => user.destroy());
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({
      where: { email: email },
      attributes: { include: ['password'] },
    });
  }
}
