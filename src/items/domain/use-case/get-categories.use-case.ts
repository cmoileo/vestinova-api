import {ItemRepository} from "../../infrastructure/repository/ItemRepository";
import CategoryEntity from "../../infrastructure/entity/Category.entity";

export class GetCategoriesUseCase {
    private readonly itemRepository: ItemRepository;
    constructor(itemRepository: ItemRepository) {
        this.itemRepository = itemRepository;
    }
    async getCategories(): Promise<CategoryEntity[] | Error> {
        try {
            const categories = await this.itemRepository.getCategories();
            const parentCategories = categories.filter((category: CategoryEntity) => category.isParent);
            return parentCategories.map((parentCategory: any) => {
                if (!parentCategory.isParent) return;
                parentCategory.dataValues.children = categories.filter((category: CategoryEntity) => category.parentId == parentCategory.id);
                return parentCategory;
            });
        } catch (error: any) {
            return new Error(error);
        }
    }
}