import {ItemModel} from "../../domain/model/item.model";
import ItemEntity from "../entity/Item.entity";
import CategoryEntity from "../entity/Category.entity";

export interface IItemRepository {
    createItem(item: ItemModel): Promise<ItemEntity>;
    deleteItem(id: string): void;
    findItemById(id: string): Promise<ItemEntity | null>;
    findAllItems(pagination: number): Promise<ItemEntity[]>;
    updateItem(id: string, item: ItemEntity): Promise<ItemEntity | null>;
    getCategories(): Promise<CategoryEntity[]>;
    searchItems(search: string): Promise<ItemEntity[]>;
}