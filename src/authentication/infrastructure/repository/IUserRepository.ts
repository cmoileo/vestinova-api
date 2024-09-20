import {UserModel} from "../../domain/model/User.model";

export interface IUserRepository {
    getUserById(id: string): Promise<any>;
    createUser(data: UserModel): Promise<any>;
    getUsers(): Promise<any>;
    getUserByEmail(email: string): Promise<any>;
}