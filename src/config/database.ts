import { Logger } from '@nestjs/common';
import { registerAs } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';

const logger = new Logger('DATABASE');

export default registerAs(
  'database',
  (): SequelizeModuleOptions => ({
    dialect: 'mysql',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 0) || 3306,
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || 'demo',
    logging: (sql) => logger.debug(sql),
    autoLoadModels: true,
    synchronize: true,
    sync: {
      alter: true,
    },
  }),
);
