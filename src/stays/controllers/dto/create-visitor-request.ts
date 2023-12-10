import { VisitorEntity } from "../../domain/visitor-entity"
import { CreatePersonRequest } from "./create-person-request"

export class CreateVisitorRequest {
    dni: string
    person: CreatePersonRequest
    wristbandNumber: string
    idDiscount: string
    isManager: boolean

    static getVisitorEntity(CreateVisitorRequest: CreateVisitorRequest) {
        return new VisitorEntity(
            CreateVisitorRequest.wristbandNumber,
            CreateVisitorRequest.isManager,
            CreateVisitorRequest.dni
        )
    }
}