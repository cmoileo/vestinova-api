import { DataTypes, Model } from 'sequelize';
import {sequelize} from "../../../models";

class CartEntity extends Model {}

CartEntity.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    },
    { sequelize, tableName: 'cart' }
);

export default CartEntity;
