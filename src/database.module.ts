import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import database from './config/database';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule.forFeature(database)],
      useFactory: (config: ConfigService) => {
        return config.get('database');
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
