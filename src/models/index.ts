import sequelize from "../../sequelize.config";
import UserEntity from "../authentication/infrastructure/entity/User.entity";
import ItemEntity from "../items/infrastructure/entity/Item.entity";
import CategoryEntity from "../items/infrastructure/entity/Category.entity";
import CartEntity from "../cart/infrastructure/entity/Cart.entity";
import CartItemEntity from "../cart/infrastructure/entity/CartItem.entity";

UserEntity.hasMany(ItemEntity, { foreignKey: "userId", as: "items" });
UserEntity.hasMany(CartEntity, { foreignKey: "userId", as: "cart" });
CartEntity.belongsTo(UserEntity, { foreignKey: "userId", as: "user" });
ItemEntity.belongsTo(UserEntity, { foreignKey: "userId", as: "user" });
ItemEntity.belongsToMany(CategoryEntity, { through: "ItemCategory", as: "categories" });
CategoryEntity.belongsToMany(ItemEntity, { through: "ItemCategory", as: "items" });

CartEntity.belongsToMany(ItemEntity, { through: "cart_item", as: "items" });
ItemEntity.belongsToMany(CartEntity, { through: "cart_item", as: "carts" });

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
