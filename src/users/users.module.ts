import { Module } from '@nestjs/common';
import { UserController } from './infrastructure/handlers/controllers/user-controller';

@Module({
    controllers: [UserController]
})
export class UsersModule {}
