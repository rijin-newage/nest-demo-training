import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BlogModule } from 'src/blog/blog.module';
import { PersonController } from './person.controller';
import { Person } from './person.model';
import { PersonService } from './person.service';

@Module({
  imports: [forwardRef(() => BlogModule), SequelizeModule.forFeature([Person])],
  controllers: [PersonController],
  providers: [PersonService],
  exports: [PersonService],
})
export class PersonModule {}
