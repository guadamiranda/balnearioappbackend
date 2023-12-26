import { IRepositoryConnection } from "../../shared/infrastructure/connection/repository-connection";
import { RoleEntity } from "../domain/role-entity";
import { Injectable } from "@nestjs/common";
import { RoleRow } from "./dto/role-row";

@Injectable()
export class RoleRepository {
    private repository = this.supabaseRepository.getConnection()
    private ROLE_TABLE_NAME = 'Role'
    constructor(
        private readonly supabaseRepository: IRepositoryConnection
    ) {}

    async findAll(): Promise<RoleEntity[]> {
        const {data:roleQuery, error} = await this.repository
        .from(this.ROLE_TABLE_NAME)
        .select()
        if(error) {
            throw Error(`Error en la busqueda de los roles.\n ${error}`)
        }
        return RoleRow.convertRowsToEntities(roleQuery as RoleRow[])
    }

    async findOne(id: string): Promise<RoleEntity> {
        const {data:roleQuery, error} = await this.repository
        .from(this.ROLE_TABLE_NAME)
        .select()
        .eq('id', id)
        if(error) {
            throw Error(`Error en la busqueda de los roles.\n ${error}`)
        }
        return RoleRow.convertRowsToEntities(roleQuery as RoleRow[])[0]
    }
}