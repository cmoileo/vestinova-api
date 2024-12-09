import {CartRepository} from "../infrastructure/repository/CartRepository";

export class CartController {
    private cartRepository: CartRepository;

    constructor(cartRepository: CartRepository) {
        this.cartRepository = cartRepository;

        this.addItemToCart = this.addItemToCart.bind(this);
        this.getCartItems = this.getCartItems.bind(this);
        this.deleteCartItem = this.deleteCartItem.bind(this);
        this.clearCart = this.clearCart.bind(this);
    }

    public async addItemToCart(req: any, res: any): Promise<void> {
        const body = req.body;
        const itemId = body.itemId;
        console.log(req);
        const userId = req.user.id;
        const cart = await this.cartRepository.getCartItems(userId);
        try {
            await this.cartRepository.addItemToCart(itemId, cart.id);
            res.status(201).send();
        } catch (e) {

            throw e;
        }
    }

    public async getCartItems(req: any, res: any): Promise<any> {
        const userId = req.user.id;
        try {
            res.status(200).json(await this.cartRepository.getCartItems(userId));
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    public async deleteCartItem(req: any, res: any): Promise<void> {
        const cartId = req.params.id;
        try {
            await this.cartRepository.deleteCartItem(cartId);
            res.status(204).send();
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    public async clearCart(req: any, res: any): Promise<void> {
        const cartId = req.params.id;
        try {
            await this.cartRepository.clearCart(cartId);
            res.status(204).send();
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
}