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
import { VehicleRepository } from './repository/vehicle-repository';
import { VehicleServices } from './services/vehicle-services';
import { AnimalServices } from './services/animal-services';
import { AnimalRepository } from './repository/animal-repository';
import { Module } from '@nestjs/common';
import { PriceController } from './controllers/price-controller';
import { DiscountController } from './controllers/discount-controllers';
import { PriceServices } from './services/price-services';
import { PriceRepository } from './repository/price-repository';
import { DiscountServices } from './services/discount-services';
import { DiscountRepository } from './repository/discount-repository';
import { StayTypeRepository } from './repository/stay-type-repository';

@Module({
  imports: [SharedModule],
  controllers: [StayController, PriceController, DiscountController],
  providers: [
    StayServices, 
    StayRepository, 
    GroupServices, 
    GroupRepository,
    VisitorServices,
    VisitorRepository,
    PersonServices,
    PersonRepository,
    VehicleServices,
    VehicleRepository,
    AnimalServices,
    AnimalRepository,
    PriceServices,
    PriceRepository,
    DiscountServices,
    DiscountRepository,
    StayTypeRepository
  ],
  exports: [
    StayServices
  ]
})
export class StaysModule {}
