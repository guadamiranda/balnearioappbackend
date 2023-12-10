import { PersonEntity } from "../../domain/person-entity"

export class CreatePersonRequest {
    dni: string
    firstName: string
    lastName: string
    phone: string
    location: string
    memberNumber: string

    getPersonEntity() {
        return new PersonEntity(
            this.dni,
            this.firstName,
            this.lastName,
            this.phone,
            this.location,
            this.memberNumber
        )
    }
 }