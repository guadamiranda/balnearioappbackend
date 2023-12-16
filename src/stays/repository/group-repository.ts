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

    async createGroup(groupEntity: GroupEntity): Promise<GroupEntity> {
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
}