import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Person } from 'src/person/person.model';

@Table
export class Blog extends Model {
  @Column
  title: string;

  @Column(DataType.TEXT)
  content: string;

  @ForeignKey(() => Person)
  @Column(DataType.INTEGER)
  personId: number;

  @BelongsTo(() => Person)
  person: Person;
}
