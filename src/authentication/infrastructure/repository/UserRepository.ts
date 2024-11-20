import { IUserRepository } from './IUserRepository';
import UserEntity from '../../infrastructure/entity/User.entity';

export class UserRepository implements IUserRepository {
    async getUserById(id: string): Promise<UserEntity> {
        const user = await UserEntity.findByPk(id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    async getUsers(): Promise<UserEntity[]> {
        return UserEntity.findAll();
    }

    async createUser(data: any): Promise<any> {
        return UserEntity.create(data);
    }

    async getUserByEmail(email: string): Promise<UserEntity> {
        const user = await UserEntity.findOne({ where: { email } });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
}