import { StayRepository } from "../repository/stay-repository";
import { VisitorEntity } from "../domain/visitor-entity";
import { VisitorServices } from "./visitor-services";
import { StayEntity } from "../domain/stay-entity";
import { GroupServices } from "./group-services";
import { Injectable } from "@nestjs/common";
import { GroupEntity } from "../domain/group-entity";
import { AnimalServices } from "./animal-services";
import { VehicleServices } from "./vehicle-services";
import { VehicleEntity } from "../domain/vehicle-entity";
import { AnimalEntity } from "../domain/animal-entity";

@Injectable()
export class StayServices {
    constructor(
        private readonly stayRepository: StayRepository,
        private readonly groupServices: GroupServices,
        private readonly visitorServices: VisitorServices,
        private readonly vehicleServices: VehicleServices,
        private readonly animalServices: AnimalServices
    ) {}
    
    async initializeStay(stayEntity: StayEntity, groupEntity: GroupEntity, visitorEntitys: VisitorEntity[]): Promise<StayEntity> {
        console.log('Initialize stay')
        const vehicleEntity = new VehicleEntity(groupEntity.carPlate);
        const animalEntity = new AnimalEntity(groupEntity.animals.quantity, groupEntity.animals.typeAnimal);
        await this.createStay(stayEntity)

        groupEntity.setIdStay(stayEntity.id)
        await this.vehicleServices.createVehicle(vehicleEntity)
        await this.groupServices.createGroup(groupEntity)

        visitorEntitys.forEach(visitor => visitor.setIdGroup(groupEntity.id))
        await this.visitorServices.createManyVisitors(visitorEntitys)
        await this.animalServices.registerAnimals(animalEntity, groupEntity.id)

        stayEntity.completeStay(groupEntity, visitorEntitys)
        return stayEntity
    }

    async createStay(stayEntity: StayEntity): Promise<StayEntity> {
        console.log('Stay to be created: ', stayEntity)
        const createdStay = await this.stayRepository.createStay(stayEntity);

        if(!createdStay) 
            throw Error('Error creating stay')
        return stayEntity
    }

}