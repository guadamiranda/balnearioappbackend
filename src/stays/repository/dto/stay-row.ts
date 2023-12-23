import { StayEntity } from "src/stays/domain/stay-entity"

export class StayRow {
    id: string
    init_date: string
    finish_date: string
    amount: number
    stay_type: string

    static convertEntityToTable(stayEntity: StayEntity): StayRow {
        const tableStay = new StayRow()
        tableStay.id = stayEntity.id
        tableStay.init_date = stayEntity.initDate
        tableStay.finish_date = stayEntity.finishDate
        tableStay.amount = stayEntity.amount
        tableStay.stay_type = stayEntity.stayType

        return tableStay
    }

    static convertTableToEntity(tableRow: StayRow): StayEntity {
        const stayEntity = new StayEntity(
            tableRow.init_date, 
            tableRow.finish_date, 
            tableRow.amount, 
            tableRow.stay_type
        )

        stayEntity.setId(tableRow.id)
        return stayEntity
    }
}