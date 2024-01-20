import { EmployeEntity } from "./employe-entity"

export class WorkshiftEntity {
    id: string
    initDate: string
    finishDate: string
    observations: string
    dniEmployee: string
    employee?: EmployeEntity

    constructor(dniEmployee: string, initDate: string) {
        this.initDate = initDate
        this.dniEmployee = dniEmployee
    }

    finish(finishDate: string, observations: string) {
        this.finishDate = finishDate
        this.observations = observations
    }

    setId(id: string) { this.id = id; }

    setEmployee(employee: EmployeEntity) { this.employee = employee; }
}