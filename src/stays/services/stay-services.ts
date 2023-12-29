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
        console.log('Finish Creation Stay')
        return stayEntity
    }

    async createStay(stayEntity: StayEntity): Promise<StayEntity> {
        console.log('Stay to be created: ', stayEntity)
        const createdStay = await this.stayRepository.createStay(stayEntity);

        if(!createdStay) 
            throw Error('Error creating stay')
        return stayEntity
    }

    async getActiveStays(): Promise<StayEntity[]> {
        const staysActives = this.stayRepository.getActiveStays()

        if(!staysActives) 
            throw Error('Error fetching actives stays')
        return staysActives
    }

    async deleteStays(ids: string[]): Promise<any> {
        const foundStays = await this.findStay(ids)
        if(foundStays.length == 0)
            throw Error(`Error deleting stay: No exists stays to delete with ids ${ids}`)

        const foundGroups = await this.groupServices.findGroupsByIdsStay(foundStays.map(stay => stay.id))
        
        if(foundGroups.length == 0)
            throw Error(`Something went wrong deleting stay: No exists groups to delete with ids ${ids}`)

        const idsGroups = foundGroups.map(group => group.id)
        await this.animalServices.deleteAnimalsByIdsGroup(idsGroups)
        await this.visitorServices.deleteVisitorsByIdsGroup(idsGroups)
        await this.groupServices.deleteGroupsByIds(idsGroups)
        const isDeleted = await this.stayRepository.deleteByIds(foundStays.map(stay => stay.id))
        
        if(!isDeleted)
            throw Error('Error deleting stay')
            
        return {
            message: `Stays with ids ${ids} deleted`,
        }
    }

    async findStay(ids: string[]): Promise<StayEntity[]> {
        const foundStays = await this.stayRepository.findStays(ids)
        if(foundStays.length == 0)
            throw Error('Error finding stay')

        return foundStays
    }

    async findSpecificStay(ids: string[]): Promise<any> {
        const foundStay = await this.findStay(ids)
        const foundGroup = await this.groupServices.findGroupsByIdsStay([foundStay[0].id])
        const foundVisitors = await this.visitorServices.findVisitorsByIdGroup(foundGroup[0].id)

        return {
            stay: foundStay[0],
            group: foundGroup[0],
            visitors: foundVisitors
        }
    }

}