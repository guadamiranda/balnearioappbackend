export class DeleteRoleResponseDto {
    message: string;
    constructor(idRole: string) {
        this.message = `The role ${idRole} was successfully removed`
    }
}