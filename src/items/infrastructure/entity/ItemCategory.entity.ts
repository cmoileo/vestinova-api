import sequelize from "../../../../sequelize.config";
import { DataTypes, Model } from "sequelize";
import ItemEntity from "./Item.entity";
import CategoryEntity from "./Category.entity";

class ItemCategory extends Model {
    public itemId!: string;
    public categoryId!: number;
}

ItemCategory.init(
    {
        itemId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: ItemEntity,
                key: "id",
            },
            onDelete: "CASCADE",
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: CategoryEntity,
                key: "id",
            },
            onDelete: "CASCADE",
        },
    },
    {
        sequelize,
        tableName: "ItemCategory",
        timestamps: false,
    }
);

ItemEntity.belongsToMany(CategoryEntity, {
    through: ItemCategory,
    as: "categories",
    foreignKey: "itemId",
    otherKey: "categoryId",
});

CategoryEntity.belongsToMany(ItemEntity, {
    through: ItemCategory,
    as: "items",
    foreignKey: "categoryId",
    otherKey: "itemId",
});

export default ItemCategory;
