import {ItemModel} from "../../../items/domain/model/item.model";

export class CartModel {
    public userId!: string;
    public items!: ItemModel[];

    public setUserId(userId: string): Error | void {
        if (!userId) {
            return new Error("User id is required");
        }
        this.userId = userId;
    }

    public addItem(item: ItemModel): Error | void {
        if (!item) {
            return new Error("Item is required");
        }
        if (this.items.includes(item)) {
            return new Error("Item already exists in cart");
        }
        this.items.push(item);
    }

    public removeItem(item: ItemModel): Error | void {
        if (!item) {
            return new Error("Item is required");
        }
        if (!this.items.includes(item)) {
            return new Error("Item does not exist in cart");
        }
        this.items = this.items.filter((i) => i !== item);
    }

    public clearCart(): void {
        this.items = [];
    }
}