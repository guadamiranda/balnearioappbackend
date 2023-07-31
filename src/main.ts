import { IRepositoryConnection } from './shared/infrastructure/connection/repository-connection';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';


const BASE_PATH = 'balneario/api'

async function bootstrap() {
  dotenv.config();
  const port = 3000
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(BASE_PATH);
  app.get(IRepositoryConnection).createConnection();
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port , () => console.log(`Listening port: ${port}`));
}
bootstrap();
