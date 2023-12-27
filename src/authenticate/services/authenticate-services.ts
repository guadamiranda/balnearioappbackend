import { WorkshiftService } from "../../employees/services/workshift-services";
import { EmployeeService } from "../../employees/services/employe-services";
import { RoleService } from "../../employees/services/role-services";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthenticateServices {
    constructor(
        private readonly employeeService: EmployeeService,
        private readonly workshiftService: WorkshiftService,
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
        
        const isAdmin = await this.isAdminUser(employee.roleId)
        const workshift = await this.workshiftService.initWorkshift(employee.dni)
        return {
            access_token: this.jwtService.sign({
                dni: employee.dni,
                roleId: employee.roleId,
                workshiftId: workshift.id
            }),
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            isAdmin
        }
    }

    async isAdminUser(roleId): Promise<boolean> {
        return await this.roleService.isAdminId(roleId)
    }
}