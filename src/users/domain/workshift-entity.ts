export class WorkshiftEntity {
    id: string;
    initDate: number;
    finishDate: string;
    observations: string;
    employeId: string;

    constructor() {}

    init(initDate: number, employeId:string) {
        const workshiftEntity = new WorkshiftEntity()
        workshiftEntity.initDate = initDate;
        workshiftEntity.employeId = employeId;

        return workshiftEntity
    }

    setId(id: string) {
        this.id = id;
    }
}