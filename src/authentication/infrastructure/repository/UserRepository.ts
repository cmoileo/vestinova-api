import { IUserRepository } from './IUserRepository';
import UserEntity from '../../infrastructure/entity/User.entity';
import { UserModel } from '../../domain/model/User.model';

export class UserRepository implements IUserRepository {
    public async getUserById(userId: string): Promise<any | null> {
        try {
            const user = await UserEntity.findByPk(userId);
            return user ? user.toJSON() : null;
        } catch (error) {
            throw new Error(`Failed to retrieve user: ${error.message}`);
        }
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