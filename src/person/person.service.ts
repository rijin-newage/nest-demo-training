import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Person } from './person.model';

@Injectable()
export class PersonService {
  constructor(
    @InjectModel(Person)
    private personModel: typeof Person,
  ) {}

  create(body: any): Promise<Person> {
    return this.personModel.create(body);
  }

  getAll(): Promise<Person[]> {
    return this.personModel.findAll();
  }

  async update(id: number, body: any): Promise<Person> {
    const person = await this.personModel.findByPk(id);
    return person.update(body);
  }
}
