import {IItemRepository} from "../../infrastructure/repository/IItemRepository";
import ItemEntity from "../../infrastructure/entity/Item.entity";
import {ItemRepository} from "../../infrastructure/repository/ItemRepository";
import {Error} from "sequelize";
import {ImageStorageService} from "../../../shared/service/imageStorage.service";

export class GetItemsUseCase {
    private readonly itemRepository: ItemRepository;
    constructor(itemRepository: ItemRepository) {
        this.itemRepository = itemRepository;
    }
    public async getItems(pagination: number): Promise<ItemEntity[] | Error> {
        try {
            const items: any = await this.itemRepository.findAllItems(pagination);
            for (const item of items) {
                if (item.imageIds.length > 0) {
                    item.imagesUrls = item.imageIds.map(async (imageId: string) => {
                        return await new ImageStorageService().getImageUrl(imageId);
                    })
                }
            }
            return await this.itemRepository.findAllItems(pagination);
        } catch (error: any) {
            return error
        }
    }
}