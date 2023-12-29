import { WorkshiftRepository } from "../repository/workshift-repository";
import { WorkshiftEntity } from "../domain/workshift-entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class WorkshiftService {
    constructor(
        private readonly workshiftRepository: WorkshiftRepository
    ) {}
    async initWorkshift(dniEmployee: string): Promise<WorkshiftEntity> {
        const workshiftEntity = new WorkshiftEntity(dniEmployee, new Date().toISOString())
        return await this.workshiftRepository.create(workshiftEntity)
    }

    async finishWorkshift(idWorkshift: string, observations: string): Promise<WorkshiftEntity> {
        const incompleteWorkshift = await this.workshiftRepository.findOne(idWorkshift)
        if(Object.keys(incompleteWorkshift).length === 0) {
            throw new Error('Workshift not found')
        }
        
        incompleteWorkshift.finish(new Date().toISOString(), observations)
        return await this.workshiftRepository.updateOne(incompleteWorkshift)
    }
}