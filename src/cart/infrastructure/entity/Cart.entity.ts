import {DataTypes, Model} from "sequelize";
import {ItemModel} from "../../../items/domain/model/item.model";
import {sequelize} from "../../../models";

class CartEntity extends Model {
    public id!: string;
    public userId!: string;
    public items!: ItemModel[];
}

CartEntity.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    itemsData: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'carts',
})

export default CartEntity;