import { IRepositoryConnection } from "../../shared/infrastructure/connection/repository-connection";
import { PersonEntity } from "../domain/person-entity";
import { PersonRow } from "./dto/person-row";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PersonRepository {
    private repository = this.supabaseRepository.getConnection()
    private PERSON_TABLE_NAME = 'Person'
    
    constructor(
        private readonly supabaseRepository: IRepositoryConnection
    ) { }
    async findPersons(nrosDoc: number[]): Promise<PersonEntity[]> {
            const { data:personQuery, error } = await this.repository
            .from(this.PERSON_TABLE_NAME)
            .select('*')
            .in('nroDoc', nrosDoc)
    
            if(error) {
                console.log(error)
                return null
            }

            return PersonRow.convertRowsToPersonEntitys(personQuery)          
    }

    async createManyPerson(personEntitys: PersonEntity[]): Promise<PersonEntity[]> {
        const personRows = PersonRow.convertPersonEntityToRow(personEntitys)

        const {data:personQuery, error} = await this.repository
        .from(this.PERSON_TABLE_NAME)
        .insert(personRows)
        .select()

        if(error) {
            console.log(error)
            return null
        }

        return personEntitys
    }

    async updateManyPerson(personEntity: PersonEntity[]): Promise<PersonEntity[]> {
        const personRows = PersonRow.convertPersonEntityToRow(personEntity);
        const nroDocs = personEntity.map(entity => entity.nroDoc);

        const {data:personQuery, error} = await this.repository
        .from(this.PERSON_TABLE_NAME)
        .update(personRows)
        .in('nroDoc', nroDocs)
        .select()

        if(error) {
            console.log(error)
            return null
        }

        return PersonRow.convertRowsToPersonEntitys(personQuery as PersonRow[])
    }

    private setIdsOnEntitys(personEntitys: PersonEntity[], personRows: PersonRow[]) {
        const indexPersons = personRows.reduce((acc, row) => {
            acc[row.nro_doc] = row
            return acc
        }, {})

        personEntitys.forEach(entity => 
            entity.setNroDoc(indexPersons[entity.nroDoc].nro_doc)
        )
    }
 }