import { IRepositoryConnection } from "../../shared/infrastructure/connection/repository-connection";
import { GroupEntity } from "../domain/group-entity";
import { Injectable } from "@nestjs/common";
import { GroupRow } from "./dto/group-row";
import { VehicleEntity } from "../domain/vehicle-entity";
import { AnimalEntity } from "../domain/animal-entity";
import { AnimalRow } from "./dto/animal-row";

@Injectable()
export class AnimalRepository {
    private repository = this.supabaseRepository.getConnection()
    private ANIMAL_TABLE_NAME = 'Animal'
    constructor(
        private readonly supabaseRepository: IRepositoryConnection
    ) {}

    async registerAnimals(animalEntity: AnimalEntity, idGroup: String): Promise<AnimalEntity> {
        const animalRow = AnimalRow.convertEntityToRow(animalEntity, idGroup)
        const {data:animalQuery, error} = await this.repository
        .from(this.ANIMAL_TABLE_NAME)
        .insert(animalRow)
        .select()

        if(error) {
            console.log("Error en el registro de animales.\n", error)
            return null
        }
        animalEntity.setId(animalQuery[0].id)
        return animalEntity
    }
}