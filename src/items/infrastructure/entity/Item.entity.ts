import sequelize from "../../../../sequelize.config";
import { DataTypes, Model } from "sequelize";
import CategoryEntity from "./Category.entity";
import UserEntity from "../../../authentication/infrastructure/entity/User.entity";

class ItemEntity extends Model {
    public id!: string;
    public name!: string;
    public description!: string;
    public price!: number;
    public userId!: string;
    public imageUrl!: string;
}

ItemEntity.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false,
            validate: {
                len: [1, 30],
            },
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 0,
            },
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "items",
    }
);

export default ItemEntity;
