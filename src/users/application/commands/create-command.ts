export class CreateCommand {
    dni: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    roleId: string;

    constructor(dni: string, firstName: string, lastName: string, password: string, email: string, roleId: string) {
        this.dni = dni;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.email = email;
        this.roleId = roleId;
    }
}