import {ICartRepository} from "./ICartRepository";
import CartEntity from "../entity/Cart.entity";
import CartItemEntity from "../entity/CartItem.entity";
import {ItemEntity} from "../../../models";
export class CartRepository implements ICartRepository{
    async addItemToCart(itemId: string, cartId: number): Promise<void> {
        try {
            await CartItemEntity.create({
                cartId: cartId,
                ItemEntityId: itemId
            });
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async getCartItems(userId: string): Promise<any> {
        try {
            return await CartEntity.findOne({
                where: {
                    userId: userId
                },
                include: [
                    {
                        model: ItemEntity,
                        as: 'items'
                    }
                ]
            });
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async deleteCartItem(cartId: number): Promise<void> {
        try {
            await CartItemEntity.destroy({
                where: {
                    cartId: cartId
                }
            });
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async clearCart(cartId: number): Promise<void> {
        try {
            await CartItemEntity.destroy({
                where: {
                    cartId: cartId
                }
            });
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async createCart(userId: string): Promise<void> {
        try {
            await CartEntity.create({
                userId: userId
            });
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
}