export class RoleEntity {
    id: string;
    name: string;
    
    constructor(id: string,name: string) {
        this.id = id;
        this.name = name;
    }

    setId(id: string) {
        this.id = id;
    }
}