import { UserEntity } from "../domain/user-entity";

export abstract class IGetUseCase {
    abstract execute(): Promise<UserEntity[]>
}