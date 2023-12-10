import { Module } from '@nestjs/common';
import { StayController } from './controllers/stay';
import { StayServices } from './services/stay-services';
import { SupaBaseRepositoryStay } from './repository/stay-repository';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [StayController],
  providers: [StayServices, SupaBaseRepositoryStay],
  exports: [
    StayServices
  ]
})
export class StaysModule {}
