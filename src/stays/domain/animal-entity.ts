export class AnimalEntity {
    id: string
    quantity: number
    typeAnimal?: string

    constructor(quantity: number, typeAnimal?: string) {
        this.quantity = quantity
        this.typeAnimal = typeAnimal
    }

    setId(id: string) {
        this.id = id
    }
}