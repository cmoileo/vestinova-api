import { DataTypes, Model } from 'sequelize';
import {sequelize} from "../../../models";
import Cart from './Cart.entity';
import Item from '../../../items/infrastructure/entity/Item.entity';

class CartItemEntity extends Model {}

CartItemEntity.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        cartId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: Cart, key: 'id' },
        },
        itemId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: { model: Item, key: 'id' },
        }
    },
    { sequelize, tableName: 'cart_item' }
);

export default CartItemEntity;
