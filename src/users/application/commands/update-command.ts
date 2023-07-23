export class UpdateCommand {
    id: string;
    dni: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    roleId: string;

    constructor(id: string, dni: string, firstName: string, lastName: string, password: string, email: string, roleId: string) {
        this.id = id;
        this.dni = dni;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.email = email;
        this.roleId = roleId;
    }
}