import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swagger } from './common/swagger/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CORS_ORIGIN ?? '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  swagger(app, 'development');

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
