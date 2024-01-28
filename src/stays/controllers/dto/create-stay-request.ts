import { CreateVisitorRequest } from "./create-visitor-request"
import { CreateGroupRequest } from "./create-group-request"
import { StayEntity } from "src/stays/domain/stay-entity"

export class CreateStayRequest {
    initDate: string
    finishDate: string
    amount: number
    stayType: string
    group: CreateGroupRequest
    payTypeCode: string
    visitors: CreateVisitorRequest[]

    static getStayEntity(createStayRequest: CreateStayRequest): StayEntity {
        return new StayEntity(
            createStayRequest.initDate,
            createStayRequest.finishDate,
            createStayRequest.amount,
            createStayRequest.stayType,
            createStayRequest.payTypeCode
        )
    }
}