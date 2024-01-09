export class StayTypeEntity {
    id: string
    name: string
    constructor(name) {
        this.name = name
    }

    setId(id: string) {
        this.id = id
    }
}