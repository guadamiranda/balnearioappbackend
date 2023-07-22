export class UserEntity {
    id: string;
    dni: string;
    firstName: string;
    lastName: string;
    email: string;
    roleId: string;
    userId: string;

    constructor(id: string,dni: string, firstName: string, lastName: string, email: string, roleId: string, userId: string) {
        this.id = id;
        this.dni = dni;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.roleId = roleId;
        this.userId = userId;
    }

    setId(id:string) {
        this.id = id;
    }
}