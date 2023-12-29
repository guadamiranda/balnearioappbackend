import { DiscountEntity } from "../../domain/discount-entity"

export class DiscountRow {
    id: string
    name: string
    percentage: number

    static convertTableToEntity(rows: DiscountRow[]): DiscountEntity[] {
        return rows.map(row => {
            const entity = new DiscountEntity(row.name, row.percentage)
            entity.setId(row.id)
            return entity
        })
    }
}