export class RoleEntity {
    id: string
    name: string
    privileges: string

    constructor(name: string, privileges: string) {
        this.name = name
        this.privileges = privileges
    }

    setId(id: string) { this.id = id; }
}