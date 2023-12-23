import { VisitorEntity } from "./visitor-entity"
import { GroupEntity } from "./group-entity"

export class StayEntity {
    id: string
    initDate: string
    finishDate: string
    amount: number
    stayType: string
    group?: GroupEntity
    visitors?: VisitorEntity[]

    constructor(initDate, finishDate, amount, stayType) {
        this.initDate = initDate,
        this.finishDate = finishDate,
        this.amount = amount,
        this.stayType = stayType
    }

    completeStay(groupEntity: GroupEntity, visitorEntities: VisitorEntity[]) {
        this.group = groupEntity
        this.visitors = visitorEntities
    }

    setId(id) {
        this.id = id
    }
}