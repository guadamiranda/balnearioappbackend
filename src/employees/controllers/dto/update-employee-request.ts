import { EmployeEntity } from "../../domain/employe-entity"

export class UpdateEmployeeRequest {
    dni: string
    firstName: string
    lastName: string
    email: string
    roleId: string
    password: string
    isDismissal: boolean
    
    static convertToEntity(request: UpdateEmployeeRequest): EmployeEntity {
        return new EmployeEntity(
            request.dni, 
            request.firstName, 
            request.lastName, 
            request.email, 
            request.password, 
            request.roleId,
            request.isDismissal
        )
    }
}