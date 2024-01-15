import { IRepositoryConnection } from "../../shared/infrastructure/connection/repository-connection";
import { Injectable } from "@nestjs/common";
import { EmployeEntity } from "../domain/employe-entity";
import { EmployeeRow, IEmployeeColumns } from "./dto/employee-row";

@Injectable()
export class EmployeeRepository {
    private repository = this.supabaseRepository.getConnection()
    private EMPLOYEE_TABLE_NAME = 'Employee'
    constructor(
        private readonly supabaseRepository: IRepositoryConnection
    ) {}

    async create(employeeEntity: EmployeEntity): Promise<EmployeEntity> {
        const employeeRow = EmployeeRow.convertEntityToRow(employeeEntity)
        const {data:employeeQuery, error} = await this.repository
        .from(this.EMPLOYEE_TABLE_NAME)
        .insert(employeeRow)
        .select()

        if(error) {
            throw Error(`Error en la creacion de un empleado.\n ${error}`)
        }

        return EmployeeRow.convertRowsToEntities(employeeQuery as EmployeeRow[])[0]
    }

    async findOne(dni: string): Promise<EmployeEntity> {
        const {data:employeeQuery, error} = await this.repository
        .from(this.EMPLOYEE_TABLE_NAME)
        .select()
        .eq('dni', dni)

        if(error) {
            throw Error(`Error en la busqueda de un empleado.\n ${error}`)
        }

        if(employeeQuery.length == 0) return {} as EmployeEntity;
        
        return EmployeeRow.convertRowsToEntities(employeeQuery as EmployeeRow[])[0]
    }

    async findAll(): Promise<EmployeEntity[]> {
        const {data:employeeQuery, error} = await this.repository
        .from(this.EMPLOYEE_TABLE_NAME)
        .select()
        if(error) {
            throw Error(`Error en la busqueda de empleados.\n ${error}`)
        }
        return EmployeeRow.convertRowsToEntities(employeeQuery as EmployeeRow[])
    }

    async updateOne(employeeEntity: EmployeEntity): Promise<EmployeEntity> {
        const employeeRow = EmployeeRow.convertEntityToRow(employeeEntity)
        const {data: employeeQuery, error} = await this.repository
        .from(this.EMPLOYEE_TABLE_NAME)
        .update(employeeRow)
        .eq('dni', employeeEntity.dni)
        .select()
        if(error) {
            throw Error(`Error en la actualizacion de un empleado.\n ${error}`)
        }
        return EmployeeRow.convertRowsToEntities(employeeQuery as EmployeeRow[])[0];
    }

    async dismissalManyByIds(dnis: string[]): Promise<Boolean> {
        const {data: employeeQuery, error} = await this.repository
        .from(this.EMPLOYEE_TABLE_NAME)
        .update({is_deleted: true})
        .in('dni', dnis)

        if(error) {
            throw Error(`Error en la baja de empleados\n ${error}`)
        }

        return true
    }

    async findBySimpleCondition(column: IEmployeeColumns, value: string | number | any[]): Promise<EmployeEntity[]> {
        if(Array.isArray(value)) {
            const {data:employeeQuery, error} = await this.repository
            .from(this.EMPLOYEE_TABLE_NAME)
            .select()
            .in(column, value)
            if(error) {
                throw Error(`Error en la busqueda de los valores ${value} en la columna ${column}\n ${error}`)
            }
            return EmployeeRow.convertRowsToEntities(employeeQuery as EmployeeRow[])
        }

        const {data:employeeQuery, error} = await this.repository
        .from(this.EMPLOYEE_TABLE_NAME)
        .select()
        .eq(column, value)

        if(error) {
            throw Error(`Error en la busqueda del valor ${value} en la columna ${column}.\n ${error}`)
        }
        return EmployeeRow.convertRowsToEntities(employeeQuery as EmployeeRow[])
    }
}