export class GroupEntity {
    id: string
    idStay: string
    idEmployee: string
    idCampsite: string
    carPlate: string

    constructor(idEmployee, idCampsite, carPlate) {
        this.idEmployee = idEmployee,
        this.idCampsite = idCampsite,
        this.carPlate = carPlate
    }
}