
export class UserCreateResponseDto {
  dni: string
  email: string
  firstName: string
  lastName: string
  rolId: string

  constructor(dni, email, firstName, lastName, rolId) {
    this.dni = dni,
    this.email = email,
    this.firstName = firstName,
    this.lastName = lastName,
    this.rolId = rolId
  }
}