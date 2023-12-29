import { WorkshiftEntity } from "../../domain/workshift-entity";

export class WorkShiftRow {
    id: string
    init_date: string
    finish_date: string
    observations: string
    employee_dni: string

    static convertEntityToRow(workShiftEntity: WorkshiftEntity): WorkShiftRow {
        const workShiftRow = new WorkShiftRow();
        workShiftRow.id = workShiftEntity.id
        workShiftRow.init_date = workShiftEntity.initDate
        workShiftRow.finish_date = workShiftEntity.finishDate
        workShiftRow.observations = workShiftEntity.observations
        workShiftRow.employee_dni = workShiftEntity.dniEmployee
        return workShiftRow
    }

    static convertRowsToEntities(rows: WorkShiftRow[]): WorkshiftEntity[] {
        return rows.map(row => {
            const workShiftEntity = new WorkshiftEntity(
                row.employee_dni,
                row.init_date,
            );

            workShiftEntity.observations = row.observations
            workShiftEntity.finishDate = row.finish_date
            workShiftEntity.setId(row.id)
            return workShiftEntity
        })
    }
}