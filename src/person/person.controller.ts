import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BlogService } from 'src/blog/blog.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PersonService } from './person.service';

@ApiTags('person')
@Controller('person')
export class PersonController {
  constructor(
    private readonly personService: PersonService,
    private readonly blogService: BlogService,
  ) {}

  @Post()
  create(@Body() body: CreatePersonDto) {
    return this.personService.create(body);
  }

  @Get()
  getAll() {
    return this.personService.getAll();
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdatePersonDto) {
    return this.personService.update(id, body);
  }
}
