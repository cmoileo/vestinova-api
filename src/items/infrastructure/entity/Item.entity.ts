import sequelize from "../../../../sequelize.config";
import {DataTypes, Model} from "sequelize";
import CategoryEntity from "./Category.entity";

class ItemEntity extends Model {
    public id!: string;
    public name!: string;
    public description!: string;
    public price!: number;
    public userId!: string;
    public imageIds!: string[];
    public categoryIds!: number[];

    public setCategories!: (categories: CategoryEntity[]) => Promise<void>;
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
            }
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        imageIds: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
        },
        categoryIds: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'items',
    }
);

ItemEntity.belongsToMany(CategoryEntity, {through: 'ItemCategory'})
CategoryEntity.belongsToMany(ItemEntity, {through: 'ItemCategory'})

export default ItemEntity;