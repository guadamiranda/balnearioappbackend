import { DiscountEntity } from "../../domain/discount-entity"

export class DiscountRow {
    id: string
    name: string
    percentage: number
    is_deleted: boolean

    static convertTableToEntity(rows: DiscountRow[]): DiscountEntity[] {
        return rows.map(row => {
            const entity = new DiscountEntity(row.name, row.percentage, row.is_deleted)
            entity.setId(row.id)
            return entity
        })
    }
}