import { GroupEntity } from "../../domain/group-entity"

export class GroupRow {
    id: string
    id_workshift: string
    id_campsite: string
    car_plate: string
    id_stay: string

    static convertRowsToEntities(rows: GroupRow[]): GroupEntity[] {
        return rows.map(row => GroupRow.convertTableToEntity(row))
    }

    static convertEntityToTable(entity: GroupEntity): GroupRow {
        const table = new GroupRow()
        table.id = entity.id
        table.id_stay = entity.idStay
        table.id_workshift = entity.idWorkshift
        table.id_campsite = entity.idCampsite
        table.car_plate = entity.carPlate
        return table
    }

    static convertTableToEntity(tableRow: GroupRow): GroupEntity {
        const groupEntity = new GroupEntity(
            tableRow.id_workshift, 
            tableRow.id_campsite,
            tableRow.car_plate
        )
        groupEntity.setIdStay(tableRow.id_stay)
        groupEntity.setId(tableRow.id)
        return groupEntity
    }
}