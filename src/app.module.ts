import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReservesModule } from './reserves/reserves.module';

@Module({
  imports: [UsersModule, ReservesModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
