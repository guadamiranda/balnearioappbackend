import { RoleEntity } from "../../domain/role-entity";

export class RoleRow {
    id: string
    name: string
    privileges: string

    static convertEntityToRow(roleEntity: RoleEntity): RoleRow {
        const roleRow = new RoleRow();
        roleRow.id = roleEntity.id
        roleRow.name = roleEntity.name
        roleRow.privileges = roleEntity.privileges
        return roleRow
    }

    static convertRowsToEntities(roleRows: RoleRow[]): RoleEntity[] {
        return roleRows.map((roleRow) => {
            const entity = new RoleEntity(roleRow.name, roleRow.privileges)
            entity.setId(roleRow.id)
            return entity
        })
    }
}