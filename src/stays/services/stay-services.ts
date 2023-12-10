import { Injectable } from "@nestjs/common";
import { CreateStayRequest } from "../controllers/dto/create-stay-request";
import { SupaBaseRepositoryStay } from "../repository/stay-repository";
import { CreateGroupRequest } from "../controllers/dto/create-group-request";
import { CreateVisitorRequest } from "../controllers/dto/create-visitor-request";

@Injectable()
export class StayServices {
    constructor(
        private readonly stayRepository: SupaBaseRepositoryStay
    ) {}
    
    async createStay(stayDto: CreateStayRequest): Promise<any> {
        const groupEntity = CreateGroupRequest.getGroupEntity(stayDto.group)
        const visitorsEntity = stayDto.visitors.map(visitor => CreateVisitorRequest.getVisitorEntity(visitor))

        const stayEntity = this.stayRepository.createStay(CreateStayRequest.getStayEntity(stayDto));
        return stayEntity
        //return await this.userRepository.createRole(new RoleEntity('',createRoleCommand.name))
    }
}