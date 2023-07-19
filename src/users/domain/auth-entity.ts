export class AuthEntity {
    roleId: string;
    workshiftId: string;
    firstName: string;
    lastName: string;

    constructor(roleId: string, firstName: string, lastName: string, workshiftId: string) {
        this.roleId = roleId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.workshiftId = workshiftId;
    }
}