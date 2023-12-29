import { VisitorRepository } from "../repository/visitor-repository";
import { VisitorEntity } from "../domain/visitor-entity";
import { PersonServices } from "./person-services";
import { Injectable } from "@nestjs/common";

@Injectable()
export class VisitorServices{
    constructor(
        private readonly visitorRepository: VisitorRepository,
        private readonly personServices: PersonServices
    ) {}
    
    async createManyVisitors(visitorEntity: VisitorEntity[]): Promise<VisitorEntity[]> {
        console.log('Visitors to be created: ', visitorEntity)
        const personsEntitys = visitorEntity.map(visitor => visitor.person)
        await this.personServices.recolectDataFromPersons(personsEntitys)
        
        const createdVisitors = await this.visitorRepository.createManyVisitors(visitorEntity)
        if(!createdVisitors) {
            throw Error('Visitors cannot be created')
        }
        return createdVisitors
    }
    
    async deleteVisitorsByIdsGroup(ids: string[]): Promise<boolean> {
        console.log('Visitors to be deleted: ', ids)
        if(!await this.visitorRepository.deleteVisitorsbyidsGroup(ids)) 
            throw Error('Error deleting visitors')
        return true
    }

    async findVisitorsByIdGroup(id: string): Promise<VisitorEntity[]> {
        console.log('Buscando Visitors del grupo: ', id)
        const visitors = await this.visitorRepository.findVisitorsByIdGroup(id)
        if(!visitors) 
            throw Error('Error fetching visitors')

        const persons = await this.personServices.findPersons(visitors.map(visitor => parseInt(visitor.nroDoc)))
        visitors.forEach((visitor) => {
            const selectedPerson = persons.find(person => person.nroDoc.toString() == visitor.nroDoc)
            if(selectedPerson) visitor.addPersonInfo(selectedPerson)
        })

        return visitors
    }
}