import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { Sequelize } from 'sequelize-typescript';
import { AppController } from './app.controller';
import { AppGateway } from './app.gateway';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/strategy/jwt-auth.guard';
import { RoleGuard } from './auth/strategy/role.guard';
import { BlogController } from './blog/blog.controller';
import { BlogModule } from './blog/blog.module';
import config from './config';
import { DatabaseModule } from './database.module';
import { LoggerMiddleware } from './logger.middleware';
import { PermissionModule } from './permission.module';
import { PersonModule } from './person/person.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      load: [config],
    }),
    DatabaseModule,
    BlogModule,
    PermissionModule.register('app'),
    PersonModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    /* {
      provide: 'MODULE_NAME',
      useValue: 'app',
    },
    permissionProvider, */
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
    AppGateway,
  ],
})
export class AppModule implements NestModule, OnModuleInit {
  constructor(private sequelize: Sequelize) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware /* morgan('tiny') */)
      .forRoutes(BlogController);
  }

  async onModuleInit() {
    try {
      await this.sequelize.authenticate();
      console.log('Connection Success');
    } catch (error) {
      console.log('Connection Error => ', error);
    }
  }
}
