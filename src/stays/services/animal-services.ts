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
}