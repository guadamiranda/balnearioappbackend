import { VisitorEntity } from "./visitor-entity"
import { GroupEntity } from "./group-entity"
import { PayTypeCode, PayTypeEntity } from "./pay-type-entity"

export class StayEntity {
    id: string
    initDate: number
    finishDate: number
    amount: number
    stayType: string
    payTypeCode: PayTypeCode
    group?: GroupEntity
    visitors?: VisitorEntity[]

    constructor(initDate, finishDate, amount, stayType, payTypeCode) {
        this.initDate = parseFloat(initDate),
        this.finishDate = parseFloat(finishDate),
        this.amount = amount,
        this.stayType = stayType
        this.payTypeCode = PayTypeEntity.convertToEnumCode(payTypeCode)
    }

    completeStay(groupEntity: GroupEntity, visitorEntities: VisitorEntity[]) {
        this.group = groupEntity
        this.visitors = visitorEntities
    }

    setId(id) {
        this.id = id
    }

    getManager(): VisitorEntity {
        return this.visitors.find(visitor => visitor.isManager)
    }
}