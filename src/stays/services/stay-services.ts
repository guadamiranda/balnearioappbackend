import { CreateVisitorRequest } from "../controllers/dto/create-visitor-request";
import { CreateGroupRequest } from "../controllers/dto/create-group-request";
import { CreateStayRequest } from "../controllers/dto/create-stay-request";
import { StayRepository } from "../repository/stay-repository";
import { VisitorEntity } from "../domain/visitor-entity";
import { VisitorServices } from "./visitor-services";
import { StayEntity } from "../domain/stay-entity";
import { GroupServices } from "./group-services";
import { Injectable } from "@nestjs/common";

@Injectable()
export class StayServices {
    constructor(
        private readonly stayRepository: StayRepository,
        private readonly groupServices: GroupServices,
        private readonly visitorServices: VisitorServices
    ) {}
    
    async initializeStay(stayDto: CreateStayRequest) {
        console.log('Initialize stay')
        const stayEntity = CreateStayRequest.getStayEntity(stayDto)
        const groupEntity = CreateGroupRequest.getGroupEntity(stayDto.group)
        const visitorEntitys: VisitorEntity[] = stayDto.visitors.map(visitor => CreateVisitorRequest.getVisitorEntity(visitor))

        await this.createStay(stayEntity)
        await this.groupServices.createGroup(groupEntity)
        await this.visitorServices.createManyVisitors(visitorEntitys)

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