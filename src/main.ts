import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IRepositoryConnection } from './shared/infrastructure/connection/repository-connection';

const PORT_SERVER = 3000
const BASE_PATH = 'balneario/api'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(BASE_PATH);
  app.get(IRepositoryConnection).createConnection()
  await app.listen(PORT_SERVER, () => console.log(`Listening port: ${PORT_SERVER}`));
}
bootstrap();
