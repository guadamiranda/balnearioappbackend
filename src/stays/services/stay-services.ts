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
    
    async initializeStay(
        stayEntity: StayEntity, 
        groupEntity: GroupEntity, 
        visitorEntities: VisitorEntity[]
        ):Promise<StayEntity> {
        console.log('Initialize stay')
        const vehicleEntity = new VehicleEntity(groupEntity.carPlate);
        const animalEntity = new AnimalEntity(
            groupEntity.animals.quantity,
            groupEntity.animals.typeAnimal
        );
        try {
            await this.createStay(stayEntity)

            groupEntity.setIdStay(stayEntity.id)
            await this.vehicleServices.createVehicle(vehicleEntity)
            await this.groupServices.createGroup(groupEntity)
    
            visitorEntities.forEach(visitor => visitor.setIdGroup(groupEntity.id))
            await this.visitorServices.createManyVisitors(visitorEntities)
            await this.animalServices.registerAnimals(animalEntity, groupEntity.id)
    
            stayEntity.completeStay(groupEntity, visitorEntities)
            console.log('Finish Creation Stay')
            return stayEntity
        } catch (error) {
            console.log('Something was wrong in the creation of stay, trying to delete wrong stay ', error)
            if(groupEntity.id) {
                const idGroup = [groupEntity.id]
                await this.visitorServices.deleteVisitorsByIdsGroup(idGroup)
                await this.animalServices.deleteAnimalsByIdsGroup(idGroup)
                await this.groupServices.deleteGroupsByIds(idGroup)
            }
            
            await this.stayRepository.deleteByIds([stayEntity.id])
            throw Error(`Something was wrong in the creation of stay ${error.message}`)
        }
    }

    async createStay(stayEntity: StayEntity): Promise<StayEntity> {
        console.log('Stay to be created: ', stayEntity)
        const createdStay = await this.stayRepository.createStay(stayEntity);

        if(!createdStay) 
            throw Error('Error creating stay')
        return stayEntity
    }

    async getActiveStays(): Promise<any[]> {
        //const response = []
        const staysActives = await this.stayRepository.getActiveStays()

        const response = await Promise.all(staysActives.map(async (selectedStay) => {
            const groupActives = await this.groupServices.findGroupsByIdsStay([selectedStay.id])
            const visitorActives = await this.visitorServices.findVisitorsByIdGroup(groupActives[0].id)
            const visitorsManager = visitorActives.find(visitor => visitor.isManager)
            if (!visitorsManager) {
                throw new Error('Error finding visitors manager')
            }
            return {
                ...selectedStay,
                dni: visitorsManager.nroDoc,
                name: `${visitorsManager.person.firstName} ${visitorsManager.person.lastName}`
            }
        }))
        /*for(let i = 0; i < staysActives.length; i++) {
            const selectedStay: StayEntity = staysActives[i]
            const groupActives = await this.groupServices.findGroupsByIdsStay([selectedStay.id])
            const visitorActives: VisitorEntity[] = await this.visitorServices.findVisitorsByIdGroup(groupActives[0].id)
            const visitorsManager: VisitorEntity[] = visitorActives.filter(visitor => visitor.isManager)
            response.push({
                ...selectedStay,
                dni: visitorsManager[0].nroDoc,
                name: visitorsManager[0].person.firstName + ' ' + visitorsManager[0].person.lastName
            })
        }*/

        if(!staysActives) 
            throw Error('Error fetching actives stays')
        return response
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
    
    async getSpecificStayByDni(dni: string): Promise<any> {
        const selectedVisitor = await this.visitorServices.findVisitorByDni(dni)
        const selectedGroup = await this.groupServices.findGroupById(selectedVisitor.idGroup)
        const allVisitors = await this.visitorServices.findVisitorsByIdGroup(selectedGroup.id)
        const selectedStay = await this.stayRepository.findStays([selectedGroup.idStay])
        const animal = await this.animalServices.findAnimalsByIdGroup(selectedGroup.id)

        selectedGroup.setAnimals(animal[0]);
        return {
            stay: selectedStay[0],
            group: selectedGroup,
            visitors: allVisitors
        }
    }

    async findSpecificStay(ids: string[]): Promise<any> {
        const foundStay = await this.findStay(ids)
        const foundGroup = await this.groupServices.findGroupsByIdsStay([foundStay[0].id])
        const foundVisitors = await this.visitorServices.findVisitorsByIdGroup(foundGroup[0].id)
        const foundAnimal = await this.animalServices.findAnimalsByIdGroup(foundGroup[0].id)
        foundGroup[0].setAnimals(foundAnimal[0])

        return {
            stay: foundStay[0],
            group: foundGroup[0],
            visitors: foundVisitors
        }
    }

}