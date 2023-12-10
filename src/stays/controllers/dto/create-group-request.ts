import { GroupEntity } from "../../domain/group-entity"

export class CreateGroupRequest {
    idCampsite: string
    idEmployee: string
    carPlate: string

    static getGroupEntity(createGroupRequest: CreateGroupRequest) {
        return new GroupEntity(
            createGroupRequest.idEmployee,
            createGroupRequest.idCampsite,
            createGroupRequest.carPlate
        )
    }
}