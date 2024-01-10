import { StayTypeRepository } from "../repository/stay-type-repository";
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
        private readonly animalServices: AnimalServices,
        private readonly stayTypeRepository: StayTypeRepository
    ) {}
    
    async buildStayCamping(stayEntity: StayEntity, groupEntity: GroupEntity, visitorEntities: VisitorEntity[]):Promise<StayEntity> {
        console.log('Initialize stay')
        const vehicleEntity = new VehicleEntity(groupEntity.carPlate);
        const animalEntity = new AnimalEntity(
            groupEntity.animals.quantity,
            groupEntity.animals.typeAnimal
        );
        return await this.buildStay(stayEntity, groupEntity, visitorEntities, vehicleEntity, animalEntity)
    }

    async buildStay(stayEntity: StayEntity, groupEntity: GroupEntity, visitorEntities: VisitorEntity[], vehicleEntity: VehicleEntity = null, animalEntity : AnimalEntity = null):Promise<StayEntity> {
        console.log('Initialize stay')
        try {
            await this.createStay(stayEntity)
            groupEntity.setIdStay(stayEntity.id)

            if(vehicleEntity) {
                await this.vehicleServices.createVehicle(vehicleEntity)
            }

            await this.groupServices.createGroup(groupEntity)
    
            if(animalEntity) {
                await this.animalServices.registerAnimals(animalEntity, groupEntity.id)
            }

            await this.createVisitors(visitorEntities, groupEntity.id)
    
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

    async createVisitors(visitorEntities: VisitorEntity[], groupEntityId: String) {
        visitorEntities.forEach(visitor => visitor.setIdGroup(groupEntityId))
        await this.visitorServices.createManyVisitors(visitorEntities)
    }

    async createAdditionalFields(vehicleEntity: VehicleEntity | null, animalEntity: AnimalEntity | null, groupEntityId: String) {


    }

    async createStay(stayEntity: StayEntity): Promise<StayEntity> {
        console.log('Stay to be created: ', stayEntity)
        const createdStay = await this.stayRepository.createStay(stayEntity);

        if(!createdStay) 
            throw Error('Error creating stay')
        return stayEntity
    }

    async getActiveStays(): Promise<any[]> {
        const staysActives = await this.stayRepository.getActiveStays()
        const stayTypes = await this.stayTypeRepository.getAllStayTypes()

        const response = await Promise.all(staysActives.map(async (selectedStay) => {
            const groupActives = await this.groupServices.findGroupsByIdsStay([selectedStay.id])
            const visitorActives = await this.visitorServices.findVisitorsByIdGroup(groupActives[0].id)
            const visitorsManager = visitorActives.find(visitor => visitor.isManager)
            const selectedStayType = stayTypes.find(stayType => stayType.id === selectedStay.stayType)
            selectedStay.stayType = selectedStayType.name

            if (!visitorsManager) {
                throw new Error('Error finding visitors manager')
            }

            return {
                ...selectedStay,
                dni: visitorsManager.nroDoc,
                name: `${visitorsManager.person.firstName} ${visitorsManager.person.lastName}`,
                phone: visitorsManager.person.phone
            }
        }))

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
        if(!selectedVisitor){
            return {
                status: 404,
                message: 'Visitor not found'
            }
        }

        const selectedGroup = await this.groupServices.findGroupById(selectedVisitor.idGroup)
        const allVisitors = await this.visitorServices.findVisitorsByIdGroup(selectedGroup.id)
        const selectedStay = await this.stayRepository.findStays([selectedGroup.idStay])
        const animal = await this.animalServices.findAnimalsByIdGroup(selectedGroup.id)
        const stayTypes = await this.stayTypeRepository.getAllStayTypes()
        const selectedStayType = stayTypes.find(stayType => stayType.id === selectedStay[0].stayType)
        selectedStay[0].stayType = selectedStayType.name

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