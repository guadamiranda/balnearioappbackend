import { AnimalEntity } from "./animal-entity"

export class GroupEntity {
    id: string
    idStay: string
    idEmployee: string
    idCampsite: string
    carPlate: string
    animals?: AnimalEntity

    constructor(idEmployee, idCampsite, carPlate) {
        this.idEmployee = idEmployee,
        this.idCampsite = idCampsite,
        this.carPlate = carPlate
    }

    setId(id: string) {
        this.id = id
    }

    setAnimals(AnimalEntity: AnimalEntity) {
        this.animals = AnimalEntity
    }
}