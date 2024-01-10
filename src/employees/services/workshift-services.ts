import { WorkshiftRepository } from "../repository/workshift-repository";
import { StayServices } from "../../stays/services/stay-services";
import { WorkshiftEntity } from "../domain/workshift-entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class WorkshiftService {
    constructor(
        private readonly workshiftRepository: WorkshiftRepository,
        private readonly stayServices: StayServices
    ) {}
    async initWorkshift(dniEmployee: string): Promise<WorkshiftEntity> {
        const workshiftEntity = new WorkshiftEntity(dniEmployee, new Date().toISOString())
        return await this.workshiftRepository.create(workshiftEntity)
    }

    async finishWorkshift(idWorkshift: string, observations: string): Promise<WorkshiftEntity> {
        const workshift = await this.workshiftRepository.findOne(idWorkshift)
        if(Object.keys(workshift).length === 0) {
            throw new Error('Workshift not found')
        }
        
        workshift.finish(new Date().toISOString(), observations)
        this.stayServices.generateRegisterClouser(workshift)
        return await this.workshiftRepository.updateOne(workshift)
    }
}