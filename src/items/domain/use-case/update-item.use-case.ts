import ItemEntity from "../../infrastructure/entity/Item.entity";
import {ItemModel} from "../model/item.model";
import {ItemRepository} from "../../infrastructure/repository/ItemRepository";

export class UpdateItemUseCase {
    private readonly itemRepository;
    constructor(itemRepository: ItemRepository) {
        this.itemRepository = itemRepository;
    }
    public async updateItem(id: string, item: ItemEntity): Promise<ItemEntity | Error> {
        try {
            const updatedItem = await this.itemRepository.updateItem(id, item)
            if (!updatedItem) return new Error("Item not found");
            return updatedItem
        }
        catch (error: any) {
            return new Error(error.message);
        }
    }
}