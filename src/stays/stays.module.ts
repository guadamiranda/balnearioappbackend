import { Module } from '@nestjs/common';
import { StayController } from './controllers/stay-controller';
import { StayServices } from './services/stay-services';
import { StayRepository } from './repository/stay-repository';
import { SharedModule } from '../shared/shared.module';
import { GroupServices } from './services/group-services';
import { GroupRepository } from './repository/group-repository';
import { VisitorServices } from './services/visitor-services';
import { VisitorRepository } from './repository/visitor-repository';
import { PersonServices } from './services/person-services';
import { PersonRepository } from './repository/person-repository';

@Module({
  imports: [SharedModule],
  controllers: [StayController],
  providers: [
    StayServices, 
    StayRepository, 
    GroupServices, 
    GroupRepository,
    VisitorServices,
    VisitorRepository,
    PersonServices,
    PersonRepository
  ],
  exports: [

  ]
})
export class StaysModule {}
