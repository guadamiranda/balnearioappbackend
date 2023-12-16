import { GroupRepository } from "../repository/group-repository";
import { GroupEntity } from "../domain/group-entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GroupServices {
    constructor(
        private readonly groupRepository: GroupRepository
    ) {}
    
    async createGroup(groupEntity: GroupEntity): Promise<GroupEntity> {
        console.log('Group to be created: ', groupEntity)
        const createdGroup = await this.groupRepository.createGroup(groupEntity)
        if(!createdGroup) {
            throw Error('Group cannot be created')
        }
        return createdGroup
    }
}