import { StayEntity } from "src/stays/domain/stay-entity"

export class StayRow {
    id: string
    init_date: string
    finish_date: string
    amount: number
    stay_type: string
    pay_type: string

    static convertEntityToTable(stayEntity: StayEntity): StayRow {
        const tableStay = new StayRow()
        tableStay.id = stayEntity.id
        tableStay.init_date = new Date(stayEntity.initDate).toISOString()
        tableStay.finish_date = new Date(stayEntity.finishDate).toISOString()
        tableStay.amount = stayEntity.amount
        tableStay.stay_type = stayEntity.stayType
        tableStay.pay_type = stayEntity.payTypeCode

        return tableStay
    }

    static convertRowsToEntities(rows: StayRow[]): StayEntity[] {
        return rows.map(row => this.convertTableToEntity(row))
    }

    static convertTableToEntity(tableRow: StayRow): StayEntity {
        const stayEntity = new StayEntity(
            new Date(tableRow.init_date).getTime(), 
            new Date(tableRow.finish_date).getTime(), 
            tableRow.amount, 
            tableRow.stay_type,
            tableRow.pay_type
        )

        stayEntity.setId(tableRow.id)
        return stayEntity
    }
}