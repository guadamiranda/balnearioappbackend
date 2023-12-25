import { EmployeEntity } from "../../domain/employe-entity"

export class EmployeeRow {
    dni: string
    first_name: string
    last_name: string
    email: string
    password: string
    role_type_id: string
    is_deleted: boolean

    static convertEntityToRow(employeeEntity: EmployeEntity): EmployeeRow {
        const employeeRow = new EmployeeRow();
        employeeRow.dni = employeeEntity.dni
        employeeRow.first_name = employeeEntity.firstName
        employeeRow.last_name = employeeEntity.lastName
        employeeRow.email = employeeEntity.email
        employeeRow.password = employeeEntity.password
        employeeRow.role_type_id = employeeEntity.roleId
        return employeeRow
    }

static convertRowsToEntities(employeeRows: EmployeeRow[]): EmployeEntity[] {
    return employeeRows.map((employeeRow) => new EmployeEntity(
        employeeRow.dni,
        employeeRow.first_name,
        employeeRow.last_name,
        employeeRow.email,
        employeeRow.password,
        employeeRow.role_type_id,
        employeeRow.is_deleted
    ));
}
}