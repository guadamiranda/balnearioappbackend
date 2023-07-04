import { ReservesController } from './infrastructure/handlers/controllers/reserves-controller';
import { Module } from '@nestjs/common';

@Module({
    controllers: [ReservesController]
})
export class ReservesModule {}
