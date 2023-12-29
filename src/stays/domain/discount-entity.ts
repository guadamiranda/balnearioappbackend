export class DiscountEntity {
    id: string
    name: string
    percent: number
    constructor(name: string, percent: number) {
        this.name = name
        this.percent = percent
    }

    setId(id: string) {
        this.id = id
    }
}