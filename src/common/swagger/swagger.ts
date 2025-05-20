import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export async function swagger(app: INestApplication, enviroment: string) {
  if (enviroment !== 'development') {
    return;
  }

  const docOption = new DocumentBuilder()
    .setTitle('My first api')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, docOption);

  SwaggerModule.setup('api', app, document);
}
