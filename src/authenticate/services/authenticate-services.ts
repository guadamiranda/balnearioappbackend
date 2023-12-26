import { EmployeeService } from "../../employees/services/employe-services";
import { RoleService } from "../../employees/services/role-services";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthenticateServices {
    constructor(
        private readonly employeeService: EmployeeService,
        private readonly roleService: RoleService,
        private readonly jwtService: JwtService
    ) {}
    async validateUser(dni, password) {
        const employee = await this.employeeService.findEmployee(dni)

        if(Object.keys(employee).length === 0) return null

        if(await bcrypt.compare(password,  employee.password)) {
            return employee
        }

        throw new Error('Invalid credentials')
    }

    async login(user) {
        const employee = await this.validateUser(user.dni,  user.password)
        if(!employee) return false
        
        return {
            access_token: this.jwtService.sign({
                dni: employee.dni,
                roleId: employee.roleId
            }),
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email
        }
    }

    async isAdminUser(roleId) {
        return await this.roleService.isAdminId(roleId)
    }
}