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
}