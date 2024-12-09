import {ICartRepository} from "./ICartRepository";
import CartEntity from "../entity/Cart.entity";
import CartItemEntity from "../entity/CartItem.entity";
export class CartRepository implements ICartRepository{
    async addItemToCart(itemId: string, cartId: number): Promise<void> {
        try {
            await CartItemEntity.create({
                cartId: cartId,
                itemId: itemId
            });
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async getCartItems(cartId: number): Promise<any> {
        try {
            return await CartItemEntity.findAll({
                where: {
                    cartId: cartId
                },
                include: CartEntity
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