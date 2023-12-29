import { PriceEntity } from "../../domain/price-entity"

export class PriceRow {
    id: string
    name: string
    amount: number
    
    static convertTableToEntity(rows: PriceRow[]): PriceEntity[] {
        return rows.map(row => {
            const entity = new PriceEntity(row.name, row.amount)
            entity.setId(row.id)
            return entity
        })
    }
}