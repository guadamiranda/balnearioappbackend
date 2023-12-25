import { EmployeEntity } from "../../domain/employe-entity"

export class CreateEmployeeRequest {
    dni: string
    firstName: string
    lastName: string
    email?: string
    roleId: string
    password: string
    
    static convertToEntity(request: CreateEmployeeRequest): EmployeEntity {
        return new EmployeEntity(
            request.dni, 
            request.firstName, 
            request.lastName, 
            request.email, 
            request.password, 
            request.roleId,
            false
        )
    }
}