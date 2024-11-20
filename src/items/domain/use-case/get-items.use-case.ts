import {IItemRepository} from "../../infrastructure/repository/IItemRepository";
import ItemEntity from "../../infrastructure/entity/Item.entity";
import {ItemRepository} from "../../infrastructure/repository/ItemRepository";
import {Error} from "sequelize";

export class GetItemsUseCase {
    private readonly itemRepository: ItemRepository;
    constructor(itemRepository: ItemRepository) {
        this.itemRepository = itemRepository;
    }
    public async getItems(pagination: number): Promise<ItemEntity[] | Error> {
        try {
            return await this.itemRepository.findAllItems(pagination);
        } catch (error: any) {
            return error
        }
    }
}