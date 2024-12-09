export interface ICartRepository {
    addItemToCart(data: any): Promise<any>;
    getCartItems(): Promise<any>;
    deleteCartItem(id: string): Promise<any>;
    clearCart(): Promise<any>;
}