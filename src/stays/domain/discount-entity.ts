export class DiscountEntity {
    id: string
    name: string
    percent: number
    isDeleted: boolean
    constructor(name: string, percent: number, isDeleted: boolean) {
        this.name = name
        this.percent = percent
        this.isDeleted = isDeleted
    }

    setId(id: string) {
        this.id = id
    }
}