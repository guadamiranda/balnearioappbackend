import { IRepositoryConnection } from "../../../shared/infrastructure/connection/repository-connection";
import { IRepositoryUsers } from "./repository_user_interface"; 
import { RoleEntity } from "../../domain/role-entity";
import { UserEntity } from "../../domain/user-entity";
import { Injectable } from "@nestjs/common";
import { 
    EMPLOYES_NAME,
    ROLES_NAME,
    USERS_NAME,
} from "./constants/tableNames";

@Injectable()
export class SupaBaseRepositoryUser implements IRepositoryUsers {
    constructor(
        private readonly supabaseRepository: IRepositoryConnection
    ) {}

    async authUser(email: string, password: string): Promise<UserEntity | null> {
        const repository = this.supabaseRepository.getConnection()

        try {
            const { data: employe, error } = await repository
            .from(EMPLOYES_NAME)
            .select('*')
            .eq('email', email, 'password', password)
    
            if(error) console.log(error)

            if(employe.length) {
                return new UserEntity(
                    employe[0].dni,
                    employe[0].first_name,
                    employe[0].last_name,
                    employe[0].email,
                    employe[0].rol_type_id,
                    employe[0].user_account_id,
                ) 
            }

            return null
        } catch (error) {
            console.log('Error: ',error)
        }
    }
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