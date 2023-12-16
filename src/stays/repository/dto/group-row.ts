import { GroupEntity } from "../../domain/group-entity"

export class GroupRow {
    id: string
    id_employee: string
    id_campsite: string
    car_plate: string
    id_Stay: string

    static convertEntityToTable(entity: GroupEntity): GroupRow {
        const table = new GroupRow()
        table.id = entity.id
        table.id_Stay = entity.idStay
        table.id_employee = entity.idEmployee
        table.id_campsite = entity.idCampsite
        table.car_plate = entity.carPlate
        return table
    }
}