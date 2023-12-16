import { PersonRepository } from "../repository/person-repository";
import { PersonEntity } from "../domain/person-entity";
import { Injectable } from "@nestjs/common";

type RecolectDataResult = {
    personsUpdated: { [key: string]: any },
    personsThatAreNoRegistered: { [key: string]: any }
}

@Injectable()
export class PersonServices{
    constructor(
        private readonly personRepository: PersonRepository
    ) {}

    async recolectDataFromPersons(personEntitys: PersonEntity[]): Promise<RecolectDataResult> {
        console.log('Persons to be recolected: ', personEntitys)
        const nroDocs = personEntitys.map(entity => entity.nroDoc)
        const personsRegistered = await this.personRepository.findPersons(nroDocs)
        const indexedPersonsRegistered = this.getIndexedEntitys(personsRegistered)

        const personsRegisteredWithNullData = personsRegistered.filter(entity => this.hasNullData(entity))
        const personsThatAreNoRegistered = personEntitys.filter(entity => !indexedPersonsRegistered[entity.nroDoc])
    
        await this.createPersons(personsThatAreNoRegistered)
        await this.updatePersons(personsRegisteredWithNullData)

        return {
            personsUpdated: this.getIndexedEntitys(personsRegisteredWithNullData),
            personsThatAreNoRegistered: this.getIndexedEntitys(personsThatAreNoRegistered)
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
        return personEntitys.reduce((acc, entity) => {
            acc[entity.nroDoc] = entity
            return acc
        })
    }

    private hasNullData(personEntitys: PersonEntity): boolean {
       return Object.values(personEntitys).some(propValues => propValues == null)
    }
}