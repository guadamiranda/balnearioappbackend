export class AuthEntity {
    roleId: string;
    roleName: string;
    workshiftId: string;
    firstName: string;
    lastName: string;

    constructor(roleId: string, roleName:string, firstName: string, lastName: string, workshiftId: string) {
        this.roleId = roleId;
        this.roleName = roleName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.workshiftId = workshiftId;
    }
}