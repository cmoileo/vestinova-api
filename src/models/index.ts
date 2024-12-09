import sequelize from "../../sequelize.config";
import UserEntity from "../authentication/infrastructure/entity/User.entity";
import ItemEntity from "../items/infrastructure/entity/Item.entity";
import CategoryEntity from "../items/infrastructure/entity/Category.entity";

UserEntity.hasMany(ItemEntity, { foreignKey: "userId", as: "items" });
ItemEntity.belongsTo(UserEntity, { foreignKey: "userId", as: "user" });
ItemEntity.belongsToMany(CategoryEntity, { through: "ItemCategory", as: "categories" });
CategoryEntity.belongsToMany(ItemEntity, { through: "ItemCategory", as: "items" });

export { sequelize, UserEntity, ItemEntity, CategoryEntity };

export const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully.");
        await sequelize.sync();
        console.log("Database synchronized.");
    } catch (error) {
        console.error("Database initialization failed:", error);
    }
};
