import { PayTypeEntity } from "../../domain/pay-type-entity"

export class PayTypeRow {
    id: string
    name: string
    code: string

    static convertRowsToEntitys(entities: PayTypeEntity[]): PayTypeEntity[] {
        return entities.map(entity => this.convertRowToEntity(entity))
    }
    static convertEntityToRow(entity: PayTypeEntity): PayTypeRow {
        const row = new PayTypeRow()
        row.name = entity.name
        row.code = entity.code
        return row
    }

    static convertRowToEntity(row: PayTypeRow): PayTypeEntity {
        const entity = new PayTypeEntity(
            row.name,
            row.code
        )

        entity.setId(row.id)
        return entity
    }
}