import { OmitType } from '@nestjs/mapped-types';
import { Person } from '../person.model';

export class CreatePersonDto extends OmitType(Person, ['id']) {}
