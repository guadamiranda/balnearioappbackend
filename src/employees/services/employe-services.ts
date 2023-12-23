import { Injectable } from "@nestjs/common";
import { EmployeEntity } from "../domain/employe-entity";
import { EmployeeRepository } from "../repository/employee-repository";

@Injectable()
export class EmployeeService {
    constructor(
        private readonly employeeRepository: EmployeeRepository
    ) {}
    async createEmployee(employeeEntity: EmployeEntity): Promise<EmployeEntity> {
        console.log('Se va a crear al empleado: ', employeeEntity)
        const foundEmployee = await this.findEmployee(employeeEntity.dni)
        if(!this.isEmptyObject(foundEmployee)) {
            throw new Error(`El empleado con el dni ${employeeEntity.dni} ya existe`)
        }
        return await this.employeeRepository.create(employeeEntity)
    }

    private async findEmployee(dni: string): Promise<EmployeEntity> {
        const employee = await this.employeeRepository.findOne(dni)
        return employee
    }

    async getAllEmployees(): Promise<EmployeEntity[]> {     
        return await this.employeeRepository.findAll() 
    }

    async updateEmployee(employeeEntity: EmployeEntity): Promise<EmployeEntity> {
        console.log('Se va a actualizar al empleado: ', employeeEntity)
        const foundEmployee = await this.findEmployee(employeeEntity.dni)
        //TODO: Implementar codigos de expecion para no tirar un error si no tirar un codigo que lo catche una capa superior y envie un 404 no un 500
        if(this.isEmptyObject(foundEmployee)) {
            throw new Error(`El empleado con el dni ${employeeEntity.dni} no existe`)
        }
        return await this.employeeRepository.updateOne(employeeEntity)
    }

    async dismissalEmployeesByIds(dnis: string[]): Promise<Object> {
        if(await this.employeeRepository.dismissalManyByIds(dnis)) 
        {
            return {
                message: `The employees with dni ${dnis} have been dismissed`
            }
        }
    }

    private isEmptyObject(obj) {
        return Object.keys(obj).length === 0;
    }
}