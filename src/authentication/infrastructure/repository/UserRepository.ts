import { IUserRepository } from './IUserRepository';
import UserEntity from '../../infrastructure/entity/User.entity';
import { UserModel } from '../../domain/model/User.model';
import ItemEntity from '../../../items/infrastructure/entity/Item.entity';

export class UserRepository implements IUserRepository {
    async getUserById(id: string): Promise<any> {
        const userEntity = await UserEntity.findByPk(id, {
            include: [
                {
                    model: ItemEntity,
                    as: 'items',
                },
            ],
        });
    
        if (!userEntity) {
            return null;
        }
    
        return userEntity;
    }
    
    async getUserByIdWithItems(userId: string): Promise<any> {
        try {
            const user = await UserEntity.findByPk(userId, {
                include: [
                    {
                        model: ItemEntity,
                        as: "items",
                        attributes: ["id", "name", "description", "price"],
                    },
                ],
            });
    
            return user;
        } catch (error) {
            console.error("Error in getUserByIdWithItems:", error.message);
            throw error;
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