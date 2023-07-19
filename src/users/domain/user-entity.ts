export class UserEntity {
    dni: string;
    firstName: string;
    lastName: string;
    email: string;
    roleId: string;
    userId: string;

    constructor(dni: string, firstName: string, lastName: string, email: string, roleId: string, userId: string) {
        this.dni = dni;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.roleId = roleId;
        this.userId = userId;
    }
}