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
        const createdGroup = await this.groupRepository.create(groupEntity)
        if(!createdGroup) {
            throw Error('Group cannot be created')
        }
        return createdGroup
    }

    async findGroupsByIdsStay(ids: string[]): Promise<GroupEntity[]> {
        const foundGroups = await this.groupRepository.findManyByIdsStay(ids)
        if(!foundGroups) {
            throw Error(`Groups with Ids ${ids} cannot be found`)
        }
        return foundGroups
    }

    async deleteGroupsByIds(ids: string[]): Promise<boolean> {
        console.log('Groups to be deleted: ', ids)
        if(!await this.groupRepository.deleteByIds(ids)) 
            throw Error('Error deleting groups')
        return true
    }

    async findByWorkshiftIds(ids: string[]): Promise<GroupEntity[]> {
        console.log('Groups to be found by workshift ids: ', ids)
        const groups = await this.groupRepository.findBySimpleCondition('id_workshift', ids)
        if(!groups) 
            throw Error('Error finding groups by workshifts ids')
        return groups
    }

    async findGroupById(id: string): Promise<GroupEntity> {
        console.log('Group to be found: ', id)
        const group = await this.groupRepository.findOne(id)
        if(!group) 
            throw Error('Error finding group')
        return group
    }
}