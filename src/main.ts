import { IRepositoryConnection } from './shared/infrastructure/connection/repository-connection';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT_SERVER = 3001
const BASE_PATH = 'balneario/api'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(BASE_PATH);
  app.get(IRepositoryConnection).createConnection();
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT_SERVER, () => console.log(`Listening port: ${PORT_SERVER}`));
}
bootstrap();
