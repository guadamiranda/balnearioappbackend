import { IRepositoryConnection } from "../../../shared/infrastructure/connection/repository-connection";
import { IRepositoryUsers } from "./repository_user_interface"; 
import { RoleEntity } from "src/users/domain/role-entity";
import { Injectable } from "@nestjs/common";
import { 
    ROLES_NAME,
    USERS_NAME,
} from "./constants/tableNames";

@Injectable()
export class SupaBaseRepositoryUser implements IRepositoryUsers {
    constructor(
        private readonly supabaseRepository: IRepositoryConnection
    ) {}

    async getRoles(): Promise<RoleEntity[]> { 
        const repository = this.supabaseRepository.getConnection()
        
        try {
            const { data: roles, error } = await repository
            .from(ROLES_NAME)
            .select('*')
    
            if(error) console.log(error)
            
            return roles
        } catch (error) {
            console.log('Error: ',error)
        }
    }

    async createRole(roleEntity: RoleEntity): Promise<RoleEntity> { 
        const repository = this.supabaseRepository.getConnection()
        try {
            const { data: roleQuery, error } = await repository
                .from(ROLES_NAME)
                .insert({name: roleEntity.name})
                .select()
            
            if(error){
                console.log(error)
            }

            roleEntity.setId(roleQuery[0].id)
            return roleEntity
        } catch (error) {
            console.log('Error: ',error)
        }
    }

    async deleteRole(id: string): Promise<boolean> { 
        const repository = this.supabaseRepository.getConnection()
        try {
            const { error } = await repository
                .from(ROLES_NAME)
                .delete()
                .eq('id', id)
            
            if(!error) {
                console.log(error)
                return false
            }
            
            return true
        } catch (error) {
            console.log('Error: ',error)
        }
    }

    async updateRole(roleEntity: RoleEntity): Promise<RoleEntity> { 
        const repository = this.supabaseRepository.getConnection()
        try {
            const { error } = await repository
                .from(ROLES_NAME)
                .update({name: roleEntity.name})
                .eq('id', roleEntity.id)
                .select()
            
            if(!error) console.log(error)
            
            return roleEntity
        } catch (error) {
            console.log('Error: ',error)
        }
    }
}