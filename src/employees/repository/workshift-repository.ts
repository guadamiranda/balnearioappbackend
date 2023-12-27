import { IRepositoryConnection } from "../../shared/infrastructure/connection/repository-connection";
import { WorkshiftEntity } from "../domain/workshift-entity";
import { Injectable } from "@nestjs/common";
import { WorkShiftRow } from "./dto/workshift-row";

@Injectable()
export class WorkshiftRepository {
    private repository = this.supabaseRepository.getConnection()
    private WORKSHIFT_TABLE_NAME = 'Workshifts'
    constructor(
        private readonly supabaseRepository: IRepositoryConnection
    ) {}

    async create(workshiftEntity: WorkshiftEntity): Promise<WorkshiftEntity> {
        const workshiftRow = WorkShiftRow.convertEntityToRow(workshiftEntity)
        const {data:workshiftQuery, error} = await this.repository
        .from(this.WORKSHIFT_TABLE_NAME)
        .insert(workshiftRow)
        .select()

        if(error) {
            throw Error(`Error en la creacion de un turno.\n ${error}`)
        }

        return WorkShiftRow.convertRowsToEntities(workshiftQuery as WorkShiftRow[])[0]
    }

    async findOne(id: string): Promise<WorkshiftEntity> {
        const {data:workshiftQuery, error} = await this.repository
        .from(this.WORKSHIFT_TABLE_NAME)
        .select()
        .eq('id', id)

        if(error) {
            throw Error(`Error en la busqueda de un turno.\n ${error}`)
        }

        if(workshiftQuery.length == 0) return {} as WorkshiftEntity;

        return WorkShiftRow.convertRowsToEntities(workshiftQuery as WorkShiftRow[])[0]
    }

    async updateOne(workshiftEntity: WorkshiftEntity): Promise<WorkshiftEntity> {
        const workshiftRow = WorkShiftRow.convertEntityToRow(workshiftEntity)
        const {data: workshiftQuery, error} = await this.repository
        .from(this.WORKSHIFT_TABLE_NAME)
        .update({finish_date: workshiftRow.finish_date, observations: workshiftRow.observations})
        .eq('id', workshiftEntity.id)
        .select()

        if(error) {
            throw Error(`Error en la actualizacion de un turno.\n ${error}`)
        }

        return WorkShiftRow.convertRowsToEntities(workshiftQuery as WorkShiftRow[])[0]
    }

}