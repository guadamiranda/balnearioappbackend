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
        table.id = visitorEntity.id
        table.id_group = visitorEntity.nroDoc
        table.wristband_number = visitorEntity.wristbandNumber
        table.is_manager = visitorEntity.isManager
        table.nro_doc = visitorEntity.nroDoc
        return table
    }
}