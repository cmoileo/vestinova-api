import ItemEntity from "../../infrastructure/entity/Item.entity";
import {ItemRepository} from "../../infrastructure/repository/ItemRepository";

export class DeleteItemUseCase {
    private readonly itemRepository: ItemRepository;
    constructor(itemRepository: ItemRepository) {
        this.itemRepository = itemRepository;
    }
    async deleteItem(userId: string, itemId: string): Promise<void | Error> {
        try {
            const item = await this.itemRepository.findItemById(itemId);
            if (!item) return new Error("Item not found");
            if (item.userId !== userId) return new Error("Unauthorized");
            await this.itemRepository.deleteItem(itemId);
        } catch (error) {
            return new Error("Error deleting item");
        }
    }
}