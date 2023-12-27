import { AnimalEntity } from "./animal-entity"

export class GroupEntity {
    id: string
    idStay: string
    idWorkshift: string
    idCampsite: string
    carPlate: string
    animals?: AnimalEntity

    constructor(idWorkshift, idCampsite, carPlate) {
        this.idWorkshift = idWorkshift,
        this.idCampsite = idCampsite,
        this.carPlate = carPlate
    }

    setId(id: string) {
        this.id = id
    }

    setAnimals(AnimalEntity: AnimalEntity) {
        this.animals = AnimalEntity
    }

    setIdStay(idStay: string) {
        this.idStay = idStay
    }
}