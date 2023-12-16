import { StayEntity } from "src/stays/domain/stay-entity"
import { CreateGroupRequest } from "./create-group-request"
import { CreateVisitorRequest } from "./create-visitor-request"

export class CreateStayRequest {
    initDate: string
    finishDate: string
    amount: number
    stayType: string
    group: CreateGroupRequest
    visitors: CreateVisitorRequest[]

    static getStayEntity(createStayRequest: CreateStayRequest): StayEntity {
        return new StayEntity(
            createStayRequest.initDate,
            createStayRequest.finishDate,
            createStayRequest.amount,
            createStayRequest.stayType
        )
    }
}