import {ItemRepository} from "../../infrastructure/repository/ItemRepository";

export class FindItemByIdUseCase {
    private readonly itemRepository: ItemRepository;
    constructor(itemRepository: ItemRepository) {
        this.itemRepository = itemRepository;
    }
    async findItemById(itemId: string) {
        try {
            return await this.itemRepository.findItemById(itemId);
        } catch (error) {
            return new Error("Error finding item");
        }
    }
}