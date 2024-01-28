import { Injectable } from "@nestjs/common";
import { EmployeEntity } from "../domain/employe-entity";
import { EmployeeRepository } from "../repository/employee-repository";
import * as bcrypt from 'bcrypt'

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

        return await this.employeeRepository.create({
            ...employeeEntity, 
            password: await bcrypt.hash(employeeEntity.password, 5)
        })
    }

    async findEmployee(dni: string): Promise<EmployeEntity> {
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
        if(foundEmployee.password != employeeEntity.password) {
            employeeEntity.password = await bcrypt.hash(employeeEntity.password, 5)
        }
        
        return await this.employeeRepository.updateOne(employeeEntity)
    }

    async findAdminEmployees(): Promise<EmployeEntity[]> {
        const adminEmployees = await this.employeeRepository.findBySimpleCondition("role_type_id", "eb2c431f-ce15-4770-af81-09c2a1c41fa2")
        if(adminEmployees.length === 0) {
            throw new Error('No se encontraron empleados con rol de administrador')
        }
        return adminEmployees
    }

    async dismissalEmployeesByIds(dnis: string[]): Promise<Object> {
        if(await this.employeeRepository.dismissalManyByIds(dnis)) 
        {
            return {
                message: `The employees with dni ${dnis} have been dismissed`
            }
        }
    }

    async getOnlyDevelopersEmployees(): Promise<EmployeEntity[]> {
        const devsEmployee = await this.employeeRepository.findBySimpleCondition("dni", [1,2])
        if(devsEmployee.length === 0) {
            throw new Error('Error al buscar a los desarrolladores')
        }
        return devsEmployee
    }

    private isEmptyObject(obj) {
        return Object.keys(obj).length === 0;
    }
}