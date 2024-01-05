import { AnimalRepository } from "../repository/animal-repository";
import { AnimalEntity } from "../domain/animal-entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AnimalServices{
    constructor(
        private readonly animalRepository: AnimalRepository
    ) {}
    
    async registerAnimals(animalEntity: AnimalEntity, idGroup: String): Promise<AnimalEntity> {
        console.log('Animals to be registered: ', animalEntity)
        const registeredAnimal = await this.animalRepository.registerAnimals(animalEntity, idGroup)

        if(!registeredAnimal) throw Error('Error registered animals')
        return registeredAnimal
    }

    async deleteAnimalsByIdsGroup(idsGroup: string[]): Promise<boolean> {
        if(!await this.animalRepository.deleteByidsGroup(idsGroup)) 
            throw Error('Error deleting animals')
        return true
    }

    async findAnimalsByIdGroup(idGroup: string): Promise<AnimalEntity[]> {
        return await this.animalRepository.findByIdGroup(idGroup)
    } 
}