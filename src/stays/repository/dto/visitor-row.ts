import { VisitorEntity } from "../../domain/visitor-entity"

export class VisitorRow {
    id: string
    id_group: string
    wristband_number: string
    id_discount: string
    is_manager: boolean
    nro_doc: string

    static convertEntityToTable(visitorEntity: VisitorEntity): VisitorRow {
        const table = new VisitorRow()
        table.id_group = visitorEntity.idGroup
        table.wristband_number = visitorEntity.wristbandNumber
        table.is_manager = visitorEntity.isManager
        table.nro_doc = visitorEntity.nroDoc
        table.id_discount = visitorEntity.idDiscount? visitorEntity.idDiscount : null
        return table
    }

    static convertTableToEntity(rows: VisitorRow[]): VisitorEntity[] {
        return rows.map(row => {
            const entity = new VisitorEntity(
                row.wristband_number,
                row.is_manager,
                row.nro_doc
            )
            entity.setIdGroup(row.id_group)
            entity.setId(row.id)
            entity.setIdDiscount(row.id_discount)
            return entity
        })
    }
}