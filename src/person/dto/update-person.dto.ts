import { PartialType } from '@nestjs/mapped-types';
import { Person } from '../person.model';

export class UpdatePersonDto extends PartialType(Person) {}
