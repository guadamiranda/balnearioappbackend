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
            .in('nro_doc', nrosDoc)
    
            if(error) {
                console.log(error)
                return null
            }

            return PersonRow.convertRowsToPersonEntitys(personQuery)          
    }

    async createManyPerson(personEntitys: PersonEntity[]): Promise<PersonEntity[]> {
        const personRows = PersonRow.convertPersonEntitiesToRow(personEntitys)

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
        const personRows = PersonRow.convertPersonEntitiesToRow(personEntity);
        //const nroDocs = personEntity.map(entity => entity.nroDoc);

        const personEntitys = await Promise.all(personRows.map(async (person) => {
            const {data:personQuery, error} = await this.repository
            .from(this.PERSON_TABLE_NAME)
            .update({
                first_name: person.first_name,
                last_name: person.last_name,
                phone: person.phone,
                location: person.location
            })
            .eq('nro_doc', person.nro_doc)
            .select()

            if(error) {
                console.log(error)
                return null
            }

            return PersonRow.convertRowsToPersonEntitys(personQuery as PersonRow[])[0]
        }))

        /*
            const personRows = PersonRow.convertPersonEntityToRow(personEntity);
            const nroDocs = personEntity.map(entity => entity.nroDoc);

            const {data:personQuery, error} = await this.repository
            .from(this.PERSON_TABLE_NAME)
            .update(personRows)
            .in('nro_doc', nroDocs)
            .select()

            if(error) {
                console.log(error)
                return null
            }

            return PersonRow.convertRowsToPersonEntitys(personQuery as PersonRow[])
        */

        return personEntitys
    }

    async updatePerson(person: PersonEntity): Promise<PersonEntity> {
        const personRow = PersonRow.convertPersonEntityToRow(person);
        
        const {data:personQuery, error} = await this.repository
        .from(this.PERSON_TABLE_NAME)
        .update({
            first_name: personRow.first_name,
            last_name: personRow.last_name,
            phone: personRow.phone,
            location: personRow.location
        })
        .eq('nro_doc', personRow.nro_doc)
        .select()

        if(error) {
            console.log(error)
            return null
        }

        return PersonRow.convertRowsToPersonEntitys(personQuery as PersonRow[])[0]
        

        /*
            const personRows = PersonRow.convertPersonEntityToRow(personEntity);
            const nroDocs = personEntity.map(entity => entity.nroDoc);

            const {data:personQuery, error} = await this.repository
            .from(this.PERSON_TABLE_NAME)
            .update(personRows)
            .in('nro_doc', nroDocs)
            .select()

            if(error) {
                console.log(error)
                return null
            }

            return PersonRow.convertRowsToPersonEntitys(personQuery as PersonRow[])
        */
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