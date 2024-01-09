import { StayTypeEntity } from "../../domain/stay-type-entity"

export class StayTypeRow {
    id: string
    name: string

    static convertRowsToEntities(rows: StayTypeRow[]): StayTypeEntity[] {
        return rows.map(row => this.convertRowToEntity(row))
    }

    static convertRowToEntity(row: StayTypeRow): StayTypeEntity {
        const entity = new StayTypeEntity(row.name)
        entity.setId(row.id)
        return entity
    }
}