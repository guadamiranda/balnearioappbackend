import { AnimalEntity } from "src/stays/domain/animal-entity"
import { GroupEntity } from "../../domain/group-entity"

export class CreateGroupRequest {
    idCampsite: string
    carPlate: string
    quantityAnimals: number

    static getGroupEntity(createGroupRequest: CreateGroupRequest, idWorkshift: string): GroupEntity {
        const entity = new GroupEntity(
            idWorkshift,
            createGroupRequest.idCampsite,
            createGroupRequest.carPlate
        )
        const animalEntity = new AnimalEntity(
            createGroupRequest.quantityAnimals? createGroupRequest.quantityAnimals:0,
            ''
        )

        entity.setAnimals(animalEntity)
        return entity
    }
}