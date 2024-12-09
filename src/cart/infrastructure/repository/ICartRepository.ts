export interface ICartRepository {
    addItemToCart(itemId: string, cartId: number): Promise<any>;
    getCartItems(userId: string): Promise<any>;
    deleteCartItem(cartId: number): Promise<any>;
    clearCart(cartId: number): Promise<any>;
    createCart(userId: string): Promise<any>;
}