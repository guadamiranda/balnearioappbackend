import { PersonRepository } from "../repository/person-repository";
import { PersonEntity } from "../domain/person-entity";
import { Injectable } from "@nestjs/common";

type RecolectDataResult = {
    personsUpdated: PersonEntity[],
    personsThatAreNoRegistered: PersonEntity[]
}

@Injectable()
export class PersonServices{
    constructor(
        private readonly personRepository: PersonRepository
    ) {}

    async recolectDataFromPersons(personEntitys: PersonEntity[]): Promise<RecolectDataResult> {
        console.log('Persons to be recolected: ', personEntitys)
        const nroDocs = personEntitys.map(entity => entity.nroDoc)
        const personsRegistered = await this.findPersons(nroDocs)
        const indexedPersonsRegistered = this.getIndexedEntitys(personsRegistered)

        const personsRegisteredWithNullData = personEntitys.filter(entity => {return this.hasNullData(indexedPersonsRegistered[entity.nroDoc])})
        const personsThatAreNoRegistered = personEntitys.filter(entity => !indexedPersonsRegistered[entity.nroDoc])
        
        if(personsThatAreNoRegistered.length > 0)
            await this.createPersons(personsThatAreNoRegistered)
        
        if(personsRegisteredWithNullData.length > 0)
            await this.updatePersons(personsRegisteredWithNullData)

        return {
            personsUpdated: personsRegisteredWithNullData,
            personsThatAreNoRegistered: personsThatAreNoRegistered
        }
    }

    async findPersons(nroDoc: number[]): Promise<PersonEntity[]> {
        console.log('Persons to be found: ', nroDoc)
        const personEntitys = await this.personRepository.findPersons(nroDoc)

        if(!personEntitys) 
            throw Error('Error finding persons')
        return personEntitys
    }
    
    async createPersons(personEntitys: PersonEntity[]): Promise<PersonEntity[]> {
        console.log('Persons to be created: ', personEntitys)
        const createdPersons = await this.personRepository.createManyPerson(personEntitys)

        if(!createdPersons)
            throw Error('Error creating persons')
        return createdPersons
    }

    async updatePersons(personEntitys: PersonEntity[]): Promise<PersonEntity[]> {
        console.log('Persons to be updated: ', personEntitys)
        const updatedPersons = await this.personRepository.updateManyPerson(personEntitys)

        if(!updatedPersons)
            throw Error('Error updating persons')
        return updatedPersons
    }

    private getIndexedEntitys(personEntitys: PersonEntity[]) {
        if(personEntitys.length == 0) return {}

        return personEntitys.reduce((acc, entity) => {
            acc[entity.nroDoc] = entity
            return acc
        }, {})
    }

    private hasNullData(personEntitys: PersonEntity): boolean {
        if(!personEntitys) return false
        return Object.values(personEntitys).some(propValues => !propValues)
    }
}