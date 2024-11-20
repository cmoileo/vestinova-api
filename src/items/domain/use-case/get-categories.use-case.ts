import {ItemRepository} from "../../infrastructure/repository/ItemRepository";
import CategoryEntity from "../../infrastructure/entity/Category.entity";

export class GetCategoriesUseCase {
    private readonly itemRepository: ItemRepository;
    constructor(itemRepository: ItemRepository) {
        this.itemRepository = itemRepository;
    }
    async getCategories(): Promise<CategoryEntity[] | Error> {
        try {
            return await this.itemRepository.getCategories();
        } catch (error: any) {
            return new Error(error);
        }
    }
}