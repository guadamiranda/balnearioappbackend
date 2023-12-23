export class EmployeEntity {
    dni: string
    firstName: string
    lastName: string
    email: string
    password: string
    roleId: string
    isDismissal: boolean

    constructor(
        dni:string, 
        firstName: string, 
        lastName: string, 
        email: string, 
        password: string, 
        roleId: string, 
        isDismissal: boolean
        ) {
        this.dni = dni
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.password = password
        this.roleId = roleId
        this.isDismissal = isDismissal
    }
}