export class PriceEntity {
    id: string
    name: string
    amount: number

    constructor(name: string, amount: number) {
        this.name = name
        this.amount = amount
    }

    setId(id: string) {
        this.id = id
    }
}