import { PersonEntity } from "src/stays/domain/person-entity"
import { VisitorEntity } from "../../domain/visitor-entity"
import { CreatePersonRequest } from "./create-person-request"

export class CreateVisitorRequest {
    dni: string
    firstName?: string
    lastName?: string
    phone?: string
    memberNumber?: string
    location?: string
    wristbandNumber: string
    idDiscount?: string
    isManager: boolean

    static getVisitorEntity(CreateVisitorRequest: CreateVisitorRequest) {
        const visitorEntiy = new VisitorEntity(
            CreateVisitorRequest.wristbandNumber,
            CreateVisitorRequest.isManager,
            CreateVisitorRequest.dni
        )
        visitorEntiy.person = this.getPersonEntity(CreateVisitorRequest)
        return visitorEntiy
    }

    static getPersonEntity(createVisitorRequest: CreateVisitorRequest) {
        return new PersonEntity (
            createVisitorRequest.dni,
            createVisitorRequest.firstName,
            createVisitorRequest.lastName,
            createVisitorRequest.phone,
            createVisitorRequest.location,
            createVisitorRequest.memberNumber
        )   
    }
}