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

    async deleteByidsGroup(idsGroup: string[]): Promise<Boolean> {
        const {data: animalQuery, error} = await this.repository
        .from(this.ANIMAL_TABLE_NAME)
        .delete()
        .in('id_group', idsGroup)
        if(error) {
            console.log("Error en la eliminacion de animales.\n", error)
            return false
        }
        return true
    }

    async findByIdGroup(idGroup: string): Promise<AnimalEntity[]> {
        const {data: animalQuery, error} = await this.repository
        .from(this.ANIMAL_TABLE_NAME)
        .select()
        .eq('id_group', idGroup)

        if(error) {
            console.log("Error en la busqueda de animales.\n", error)
            return null
        }
        return AnimalRow.convertRowToEntity(animalQuery);
    }
}