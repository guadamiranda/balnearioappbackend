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

    async deleteByIds(ids: string[]): Promise<boolean> {
        const { error } = await this.repository
            .from(this.WORKSHIFT_TABLE_NAME)
            .delete()
            .in('id', ids)
        if(error) {
            console.log("Error al borrar los worksfhits \n", error)
            return false
        }
        return true
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

    async findBySimpleCondition(column: string, value: string | number | any[]): Promise<WorkshiftEntity[]> {
        if(Array.isArray(value)) {
            const {data: workshiftQuery, error} = await this.repository
            .from(this.WORKSHIFT_TABLE_NAME)
            .select()
            .in(column, value)
            if(error) {
                throw Error(`Error en la busqueda de los valores ${value} en la columna ${column}\n ${error}`)
            }
            return WorkShiftRow.convertRowsToEntities(workshiftQuery as WorkShiftRow[])
        }

        const {data: workshiftQuery, error} = await this.repository
        .from(this.WORKSHIFT_TABLE_NAME)
        .select()
        .eq(column, value)

        if(error) {
            throw Error(`Error en la busqueda de los valores ${value} en la columna ${column}\n ${error}`)
        }

        return WorkShiftRow.convertRowsToEntities(workshiftQuery as WorkShiftRow[])
    }

}