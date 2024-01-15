import { ISenderEmail } from "src/shared/infrastructure/email/interface-api-email";
import { WorkshiftEntity } from "../../employees/domain/workshift-entity";
import { StayTypeRepository } from "../repository/stay-type-repository";
import { StayRepository } from "../repository/stay-repository";
import { VehicleEntity } from "../domain/vehicle-entity";
import { VisitorEntity } from "../domain/visitor-entity";
import { AnimalEntity } from "../domain/animal-entity";
import { VehicleServices } from "./vehicle-services";
import { GroupEntity } from "../domain/group-entity";
import { VisitorServices } from "./visitor-services";
import { PersonServices } from "./person-services";
import { StayEntity } from "../domain/stay-entity";
import { AnimalServices } from "./animal-services";
import { GroupServices } from "./group-services";
import { Injectable } from "@nestjs/common";

@Injectable()
export class StayServices {
    constructor(
        private readonly stayRepository: StayRepository,
        private readonly groupServices: GroupServices,
        private readonly visitorServices: VisitorServices,
        private readonly vehicleServices: VehicleServices,
        private readonly animalServices: AnimalServices,
        private readonly stayTypeRepository: StayTypeRepository,
        private readonly personServices: PersonServices,
        private readonly senderEmail: ISenderEmail
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

    async createStay(stayEntity: StayEntity): Promise<StayEntity> {
        console.log('Stay to be created: ', stayEntity)
        const createdStay = await this.stayRepository.createStay(stayEntity);

        if(!createdStay) 
            throw Error('Error creating stay')
        return stayEntity
    }

    async getActiveStays(): Promise<any[]> {
        const staysActives = await this.stayRepository.getActiveStays()
        await this.completeDataStay(staysActives)
        return staysActives.map(stay => {
            const manager = stay.getManager()
            return {
                ...stay,
                dni: manager.nroDoc,
                phone: manager.person?.phone
            }
        })
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
        if(!selectedVisitor) {
            return {
                status: 404,
                message: 'Visitor not found'
            }
        }

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

    async completeDataStay(stays: StayEntity[]): Promise<StayEntity[]> {
        const stayTypes = await this.stayTypeRepository.getAllStayTypes()
        return await Promise.all(stays.map(async (selectedStay) => {
            const groupActives = await this.groupServices.findGroupsByIdsStay([selectedStay.id])
            const visitorActives = await this.visitorServices.findVisitorsByIdGroup(groupActives[0].id)
            const selectedStayType = stayTypes.find(stayType => stayType.id === selectedStay.stayType)
            selectedStay.completeStay(groupActives[0], visitorActives)
            selectedStay.stayType = selectedStayType.name

            return selectedStay
        }))
    }

    async generateRegisterClouser(workshift: WorkshiftEntity, adminEmployeesEmail: string[]): Promise<void> {
        const toDate = new Date()
        //toDate.setUTCDate(7)
        toDate.setUTCHours(0)
        toDate.setUTCMinutes(0)
        toDate.setUTCSeconds(0)

        const fromDate = new Date()
        //fromDate.setUTCDate(8)
        fromDate.setUTCHours(24)
        fromDate.setUTCMinutes(0)
        fromDate.setUTCSeconds(0)

        const totals = {
            totalEarning: 0,
            totalMembers: 0,
            totalNoMembers: 0,
            totalDiscounts: 0,
            totalVisitors: 0,
            totalStayOnDay: 0
        }

        const staysCreatedOnDay = await this.stayRepository.findByDates(toDate,fromDate)
        const stays = await this.completeDataStay(staysCreatedOnDay)

        stays.forEach(stay => {
            const totalVisitors = stay.visitors.length
            const members = stay.visitors.filter(visitor => visitor.person?.memberNum)
            const discounts = stay.visitors.filter(visitor => visitor.idDiscount)
            totals.totalEarning += stay.amount
            totals.totalMembers += members.length
            totals.totalNoMembers += Math.abs(totalVisitors - members.length)
            totals.totalDiscounts += discounts.length
        })

        totals.totalVisitors = totals.totalMembers + totals.totalNoMembers
        totals.totalStayOnDay = staysCreatedOnDay.length

        await this.senderEmail.sendRegisterClouser(totals, workshift, adminEmployeesEmail)
    }
}