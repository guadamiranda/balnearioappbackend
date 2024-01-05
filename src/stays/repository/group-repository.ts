import { IRepositoryConnection } from "../../shared/infrastructure/connection/repository-connection";
import { GroupEntity } from "../domain/group-entity";
import { Injectable } from "@nestjs/common";
import { GroupRow } from "./dto/group-row";

@Injectable()
export class GroupRepository {
    private repository = this.supabaseRepository.getConnection()
    private GROUP_TABLE_NAME = 'Group'
    constructor(
        private readonly supabaseRepository: IRepositoryConnection
    ) {}

    async create(groupEntity: GroupEntity): Promise<GroupEntity> {
        const groupTable = GroupRow.convertEntityToTable(groupEntity)
        const {data:groupQuery, error} = await this.repository
        .from(this.GROUP_TABLE_NAME)
        .insert(groupTable)
        .select()

        if(error) {
            console.log("Error en la creacion de la grupo. El error es el if 200: \n", error)
            return null
        }

        groupEntity.setId(groupQuery[0].id)
        return groupEntity
    }

    async findOne(id: string): Promise<GroupEntity> {
        const {data:groupQuery, error} = await this.repository
        .from(this.GROUP_TABLE_NAME)
        .select()
        .eq('id', id)

        if(error) {
            console.log("Error buscando grupo \n", error)
            return null
        }

        if(groupQuery.length === 0) return null

        return GroupRow.convertTableToEntity(groupQuery[0] as GroupRow)
    }

    async findManyByIdsStay(idsStay: string[]): Promise<GroupEntity[]> {
        const {data:groupQuery, error} = await this.repository
        .from(this.GROUP_TABLE_NAME)
        .select()
        .in('id_stay', idsStay)

        if(error) {
            console.log("Error buscando grupos \n", error)
            return null
        }

        if(groupQuery.length === 0) return []
        return groupQuery.map(group => GroupRow.convertTableToEntity(group as GroupRow))
    }

    async deleteByIds(ids: string[]): Promise<Boolean> {
        const {data: groupQuery, error} = await this.repository
        .from(this.GROUP_TABLE_NAME)
        .delete()
        .in('id', ids)
        if(error) {
            console.log("Error en la eliminacion de grupos. El error es: \n", error)
            return false
        }
        return true
    }
}