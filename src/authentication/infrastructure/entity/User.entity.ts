import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../../sequelize.config';
import ItemEntity from '../../../items/infrastructure/entity/Item.entity';

class UserEntity extends Model {
    public id!: string;
    public firstname!: string;
    public lastname!: string;
    public email!: string;
    public password!: string;
    public avatar?: string;
}

UserEntity.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'users',
    }
);

// UserEntity.hasMany(ItemEntity, { foreignKey: 'userId', as: 'items' });

export default UserEntity;
