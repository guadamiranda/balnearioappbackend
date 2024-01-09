import { PersonEntity } from "../../domain/person-entity"

export class PersonRow {
    nro_doc: number
    first_name: string
    last_name: string
    phone: string
    location: string
    member_num: number

    static convertRowsToPersonEntitys(personRows: PersonRow[]): PersonEntity[] {
        return personRows.map((personRow) => {
            return new PersonEntity(
                personRow.nro_doc,
                personRow.first_name,
                personRow.last_name,
                personRow.phone,
                personRow.location,
                personRow.member_num
            )
        })
    }

    static convertPersonEntitiesToRow(personEntities: PersonEntity[]): PersonRow[] {
        return personEntities.map((personEntity) => {
            return this.convertPersonEntityToRow(personEntity)
        })
    }

    static convertPersonEntityToRow(personEntity: PersonEntity): PersonRow {
        const personRow = new PersonRow();
        personRow.nro_doc = personEntity.nroDoc
        personRow.first_name = personEntity.firstName
        personRow.last_name = personEntity.lastName
        personRow.phone = personEntity.phone
        personRow.location = personEntity.location
        personRow.member_num = personEntity.memberNum
        return personRow
    }
}