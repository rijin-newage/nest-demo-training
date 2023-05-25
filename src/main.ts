import { ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';
import { AppModule } from './app.module';
import { BlogGuard } from './blog/blog.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  await ConfigModule.envVariablesLoaded;
  const config = app.get(ConfigService);
  /* const port = parseInt(process.env.PORT, 0) || 3000;
  const env = process.env.NODE_ENV || 'development'; */
  const port = config.get('port');
  const env = config.get('env');
  console.log({ port, env });
  if (env === 'development') {
    app.use(morgan('tiny'));
  }
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new BlogGuard());
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Training API Documentation')
    .setDescription('The training API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  await app.listen(port);
}
bootstrap();
