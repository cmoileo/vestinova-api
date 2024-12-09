import { DataTypes, Model } from "sequelize";
import sequelize from "../../../../sequelize.config";

class CategoryEntity extends Model {
    public id!: number;
    public name!: string;
    public isParent!: boolean;
    public parentId?: number;
}

CategoryEntity.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false,
            validate: {
                len: [1, 30],
            },
        },
        isParent: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        parentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "categories",
                key: "id",
            },
        },
    },
    {
        sequelize,
        tableName: "categories",
    }
);

export default CategoryEntity;
