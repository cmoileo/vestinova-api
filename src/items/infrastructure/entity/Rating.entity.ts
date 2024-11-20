// src/ratings/infrastructure/entity/rating-entity.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../../sequelize.config';
import UserEntity from '../../../authentication/infrastructure/entity/User.entity';
import ItemEntity from './Item.entity';

class RatingEntity extends Model {
    public id!: string;
    public userId!: string;
    public itemId!: string;
    public liked!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

RatingEntity.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        itemId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        liked: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        }
    },
    {
        sequelize,
        tableName: 'ratings',
    }
);


RatingEntity.belongsTo(UserEntity, { foreignKey: 'userId', onDelete: 'CASCADE' });
RatingEntity.belongsTo(ItemEntity, { foreignKey: 'itemId', onDelete: 'CASCADE' });

UserEntity.hasMany(RatingEntity, { foreignKey: 'userId' });
ItemEntity.hasMany(RatingEntity, { foreignKey: 'itemId' });

export default RatingEntity;
