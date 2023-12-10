export class StayEntity {
    id: string
    initDate: string
    finishDate: string
    amount: number
    stayType: string

    constructor(initDate, finishDate, amount, stayType) {
        this.initDate = initDate,
        this.finishDate = finishDate,
        this.amount = amount,
        this.stayType = stayType
    }

    setId(id) {
        this.id = id
    }
}